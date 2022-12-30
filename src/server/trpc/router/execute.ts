import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import fetch from "node-fetch";
import type { TestCase } from "@/data/Problem";
import _ from "lodash";
import { generateScoreForProblem } from "@/utils/generateScoreForProblem";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type PistonResponse = {
  ran: boolean;
  language: string;
  version: string;
  output: string;
  stdout: string;
  stderr: string;
};

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
        },
      });

      const testCases = problem.testCases as TestCase<any, any>[];
      const ranTestCases: (TestCase<any, any> & {
        valid: boolean;
        receivedOutput: string;
      })[] = [];

      let correctSolution = true;
      let numberOfFailedTestCAses = 0;

      for (let i = 0; i < testCases.length; i++) {
        console.log("hej hej hej hej");

        console.log(
          `${input.code}\n console.log(main(${testCases[i]?.input
            .map((test) =>
              typeof test === "object" ? JSON.stringify(test) : test
            )
            .join(", ")}))`
        );

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "javascript",
            source: `${input.code}\n console.log(main(${testCases[i]?.input
              .map((test) =>
                typeof test === "object" ? JSON.stringify(test) : test
              )
              .join(", ")}))`,
            stdin: "",
            args: [],
          }),
        };

        const res = await fetch(
          "https://emkc.org/api/v1/piston/execute",
          requestOptions
        );
        const data = (await res.json()) as PistonResponse;

        // piston api limits us to 2 request per secund, this stops us from exceeding that
        await sleep(500);

        console.log(data);
        // const receivedOutput = data.output;
        const receivedOutput =
          typeof testCases[i]?.output === "number"
            ? parseFloat(data.output)
            : typeof testCases[i]?.output === "boolean"
            ? JSON.parse(data.output.toLowerCase())
            : data.output;
        const completedTestCase = _.isEqual(
          testCases[i]?.output,
          receivedOutput
        );
        ranTestCases.push({
          input: testCases[i]?.input || [],
          output: testCases[i]?.output,
          valid: completedTestCase,
          receivedOutput,
        });
        if (!completedTestCase) {
          correctSolution = false;
          numberOfFailedTestCAses++;
        }
      }

      console.log(ranTestCases);
      const problemScore = generateScoreForProblem(
        input.code.length,
        correctSolution,
        problem.difficulty
      );

      // Make this, not do this :)
      if (correctSolution) {
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

        console.log("wag1 wag1 wag1 wag1");
        console.log(mostRecentSuccessfullySubmission);

        if (!mostRecentSuccessfullySubmission) {
          await ctx.prisma.user.update({
            where: {
              id: ctx.session.user.id,
            },
            data: {
              completedProblems: {
                increment: 1,
              },
              score: {
                increment: problemScore,
              },
            },
          });
        } else {
          if (problemScore > mostRecentSuccessfullySubmission.score) {
            await ctx.prisma.user.update({
              where: {
                id: ctx.session.user.id,
              },
              data: {
                score: {
                  increment:
                    problemScore - mostRecentSuccessfullySubmission.score,
                },
              },
            });
          }
        }
      }

      await ctx.prisma.submission.create({
        data: {
          status: correctSolution ? "completed" : "failed",
          testCases: ranTestCases,
          problemId: input.problemId,
          userId: ctx.session.user.id,
          code: input.code,
          score: problemScore,
        },
      });

      return {
        ranTestCases,
        correctSolution,
        numberOfFailedTestCAses,
        arguments: problem.arguments as string[],
      };
    }),
});
