import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import fetch from "node-fetch";
import type { TestCase } from "@/data/Problem";
import _ from "lodash";

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
        console.log(`${input.code}\n main(${testCases[i]?.input})`);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "javascript",
            source: `${input.code}\n console.log(main(${
              typeof testCases[i]?.input === "object"
                ? JSON.stringify(testCases[i]?.input)
                : testCases[i]?.input
            }))`,
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
        const receivedOutput = data.output;
        const completedTestCase = _.isEqual(
          testCases[i]?.output,
          typeof testCases[i]?.output === "number"
            ? parseFloat(receivedOutput)
            : receivedOutput
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

      if (input.type === "submit") {
        await ctx.prisma.submission.create({
          data: {
            status: correctSolution ? "completed" : "failed",
            testCases: ranTestCases,
            problemId: input.problemId,
            userId: ctx.session.user.id,
            code: input.code,
          },
        });
      } else {
        // Make this, not do this :)
        await ctx.prisma.submission.create({
          data: {
            status: correctSolution ? "completed" : "failed",
            testCases: ranTestCases,
            problemId: input.problemId,
            userId: ctx.session.user.id,
            code: input.code,
          },
        });
      }

      return {
        ranTestCases,
        correctSolution,
        numberOfFailedTestCAses,
        arguments: problem.arguments as string[],
      };
    }),
});
