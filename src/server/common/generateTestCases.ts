import type { TestCase } from "@/data/Problem";
import fetch from "node-fetch";
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

interface Args {
  problemName: string;
  testCases: TestCase[];
  code: string;
}

export async function generateTestCases({
  problemName,
  testCases,
  code,
}: Args) {
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
        .map((test) => (typeof test === "object" ? JSON.stringify(test) : test))
        .join(", ");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "javascript",
          source: `${code}\n
            const MENDES_SUPER_SECRET_THING = JSON.stringify(${_.camelCase(
              problemName
            )}(${functionInputs}))
            console.log(JSON.stringify(${JSON.stringify(
              testCases[i]?.output
            )}) == MENDES_SUPER_SECRET_THING)
            \nconsole.log(JSON.stringify(${JSON.stringify(
              testCases[i]?.output
            )}))
            \nconsole.log(MENDES_SUPER_SECRET_THING)`,
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

      const completedTestCase =
        timedOut ||
        !expectedOutput ||
        !receivedOutput ||
        receivedOutput === "undefined"
          ? false
          : _.isEqual(JSON.parse(expectedOutput), JSON.parse(receivedOutput)) ||
            outputs[outputs.length - 4] == "true";

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

  return { correctSolution, numberOfFailedTestCases, ranTestCases, testCases };
}
