import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { generateScoreForProblem } from "@/utils/generateScoreForProblem";
import type { ProblemArgument } from "@/data/Problem";
import { generateTestCases } from "@/server/common/generateTestCases";
import type { TestCase } from "@/data/Problem";

export const executeRouter = router({
  runCode: protectedProcedure
    .input(
      z.object({
        problemId: z.string(),
        code: z.string(),
        type: z.enum(["test", "submit"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const problem = await ctx.prisma.problem.findUniqueOrThrow({
        where: { id: input.problemId },
        select: {
          testCases: true,
          arguments: true,
          difficulty: true,
          name: true,
          warId: true,
          war: {
            select: {
              endTime: true,
              startTime: true,
            },
          },
          topSolution: {
            select: {
              id: true,
              score: true,
              createdAt: true,
            },
          },
        },
      });

      const {
        correctSolution,
        numberOfFailedTestCases,
        ranTestCases,
        testCases,
      } = await generateTestCases({
        problemName: problem.name,
        testCases: problem.testCases as TestCase[],
        code: input.code,
      });

      const problemScore = generateScoreForProblem(
        input.code.length,
        correctSolution,
        problem.difficulty
      );

      const mostRecentSuccessfullySubmission =
        await ctx.prisma.submission.findFirst({
          where: {
            userId: ctx.session.user.id,
            status: "completed",
            problemId: input.problemId,
          },
          select: {
            score: true,
          },
          orderBy: {
            score: "desc",
          },
        });

      const submission = await ctx.prisma.submission.create({
        data: {
          status: correctSolution ? "completed" : "failed",
          testCases: ranTestCases,
          problemId: input.problemId,
          userId: ctx.session.user.id,
          code: input.code,
          score: problemScore,
        },
      });

      if (correctSolution && ranTestCases.length === testCases.length) {
        const scoreToIncrement = parseFloat(
          (mostRecentSuccessfullySubmission
            ? problemScore - mostRecentSuccessfullySubmission.score
            : problemScore
          ).toFixed(2)
        );

        // if (!mostRecentSuccessfullySubmission) {
        //   await ctx.prisma.user.update({
        //     where: {
        //       id: ctx.session.user.id,
        //     },
        //     data: {
        //       completedProblems: {
        //         increment: 1,
        //       },
        //       score: {
        //         increment: scoreToIncrement,
        //       },
        //     },
        //   });
        // } else if (problemScore > mostRecentSuccessfullySubmission.score) {
        //   await ctx.prisma.user.update({
        //     where: {
        //       id: ctx.session.user.id,
        //     },
        //     data: {
        //       score: {
        //         increment: scoreToIncrement,
        //       },
        //     },
        //   });
        // }

        const currentTime = new Date();

        if (
          problem.warId &&
          problem.war &&
          currentTime > problem.war.startTime && // make sure that you can now update faction score when war is inactive
          currentTime < problem.war.endTime
        ) {
          const submissions = await ctx.prisma.submission.findMany({
            where: {
              problem: {
                warId: problem.warId,
              },
              user: {
                faction: {
                  faction: {
                    members: {
                      some: {
                        userId: ctx.session.user.id,
                      },
                    },
                  },
                },
              },
            },
            select: { score: true },
            orderBy: { score: "desc" },
            distinct: ["userId", "problemId"],
          });

          const membersCount = await ctx.prisma.faction.findFirst({
            where: {
              members: {
                some: {
                  userId: ctx.session.user.id,
                },
              },
            },
            select: {
              _count: {
                select: {
                  members: true,
                },
              },
            },
          });

          const newContenderScore =
            submissions.reduce((a, b) => a + b.score, 0) /
            (membersCount?._count.members || 1);

          const currentFactionContenderScore =
            await ctx.prisma.factionWarContender.findFirst({
              where: {
                faction: {
                  members: {
                    some: {
                      userId: ctx.session.user.id,
                    },
                  },
                },
                warId: problem.warId,
              },
              select: {
                score: true,
              },
            });

          if (
            currentFactionContenderScore &&
            newContenderScore > currentFactionContenderScore?.score
          ) {
            await ctx.prisma.factionWarContender.updateMany({
              where: {
                warId: problem.warId,
                faction: {
                  members: {
                    some: {
                      userId: ctx.session.user.id,
                    },
                  },
                },
              },
              data: {
                score: newContenderScore,
              },
            });

            await ctx.prisma.faction.updateMany({
              where: {
                members: {
                  some: {
                    userId: ctx.session.user.id,
                  },
                },
              },
              data: {
                allTimeScore: {
                  increment: scoreToIncrement,
                },
              },
            });
          }
        }
      }

      if (
        !problem.topSolution ||
        submission.score > problem.topSolution?.score
      ) {
        await ctx.prisma.problem.update({
          where: { id: input.problemId },
          data: {
            topSolution: {
              connect: {
                id: submission.id,
              },
            },
          },
        });
      }

      return {
        ranTestCases,
        correctSolution,
        problemScore,
        codeLength: input.code.length,
        numberOfFailedTestCases,
        arguments: problem.arguments as ProblemArgument[],
      };
    }),
});
