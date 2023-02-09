import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Ending array",
  difficulty: "medium",
  number: 55,
  arguments: [{ name: "s", type: "string" }],
  tags: ["arrays"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
