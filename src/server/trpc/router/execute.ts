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
          name: true,
        },
      });

      const testCases = problem.testCases as TestCase[];
      const ranTestCases: (TestCase & {
        valid: boolean;
        receivedOutput: string | null;
        timedOut: boolean;
        debugOutput: string[];
      })[] = [];

      let correctSolution = true;
      let numberOfFailedTestCases = 0;

      for (let i = 0; i < testCases.length; i++) {
        try {
          const functionInputs = testCases[i]?.input
            .map((test) =>
              typeof test === "object" ? JSON.stringify(test) : test
            )
            .join(", ");

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              language: "javascript",
              source: `${input.code}\n
              const MENDES_SUPER_SECRET_NAMN = JSON.stringify(${_.camelCase(
                problem.name
              )}(${functionInputs}))
              console.log(JSON.stringify(${JSON.stringify(
                testCases[i]?.output
              )}) == MENDES_SUPER_SECRET_NAMN)
              \nconsole.log(JSON.stringify(${JSON.stringify(
                testCases[i]?.output
              )}))
              \nconsole.log(MENDES_SUPER_SECRET_NAMN)`,
              stdin: "",
              args: [],
            }),
          };

          const res = await fetch(
            "https://emkc.org/api/v1/piston/execute",
            requestOptions
          );
          const data = (await res.json()) as PistonResponse;
          console.log(data);
          let timedOut = false;
          if (!data.ran) {
            timedOut = true;
            correctSolution = false;
          }

          // piston api limits us to 2 request per secund, this stops us from exceeding that
          await sleep(500);

          const outputs = data.output.split("\n");
          const debugOutput = outputs.slice(0, outputs.length - 4);
          const expectedOutput = outputs[outputs.length - 3];
          const receivedOutput = outputs[outputs.length - 2];

          // console.log(outputs);
          // console.log(debugOutput);

          // console.log(JSON.parse(expectedOutput || ""));
          // console.log("asdasd;;;;____;;;adasd");
          // console.log(receivedOutput);

          // console.log(JSON.parse(receivedOutput || ""));

          const completedTestCase =
            timedOut ||
            !expectedOutput ||
            !receivedOutput ||
            receivedOutput === "undefined"
              ? false
              : _.isEqual(
                  JSON.parse(expectedOutput),
                  JSON.parse(receivedOutput)
                ) || outputs[outputs.length - 4] == "true";

          ranTestCases.push({
            input: testCases[i]?.input || [],
            output: testCases[i]?.output,
            valid: completedTestCase,
            receivedOutput: (timedOut ? data.stderr : receivedOutput) || null,
            timedOut,
            debugOutput,
          });
          console.log(ranTestCases);

          if (!completedTestCase) {
            correctSolution = false;
            numberOfFailedTestCases++;
          }
        } catch (error) {
          correctSolution = false;
          numberOfFailedTestCases++;
          console.log(error);
        }
      }

      const problemScore = generateScoreForProblem(
        input.code.length,
        correctSolution,
        problem.difficulty
      );

      if (correctSolution && ranTestCases.length === testCases.length) {
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
        } else if (problemScore > mostRecentSuccessfullySubmission.score) {
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
        problemScore,
        codeLength: input.code.length,
        numberOfFailedTestCases,
        arguments: problem.arguments as string[],
      };
    }),
});
