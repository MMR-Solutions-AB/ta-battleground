import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import fetch from "node-fetch";
import type { TestCase } from "@/data/Problem";
// import type {JSONValue} from '@prisma/client'

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
        },
      });

      const testCases = problem.testCases as TestCase<any, any>[];
      const ranTestCases: (TestCase<any, any> & {
        valid: boolean;
        receivedOutput: string;
      })[] = [];

      let correctSolution = true;

      for (let i = 0; i < testCases.length; i++) {
        console.log(`${input.code}\n main(${testCases[i]?.input})`);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "javascript",
            source: `${input.code}\n console.log(main(${testCases[i]?.input}))`,
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
        const completedTestCase = receivedOutput == testCases[i]?.output;
        ranTestCases.push({
          input: testCases[i]?.input || [],
          output: testCases[i]?.output,
          valid: completedTestCase,
          receivedOutput,
        });
        if (!completedTestCase) {
          correctSolution = false;
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
      }

      return { ranTestCases, correctSolution };
    }),
});
