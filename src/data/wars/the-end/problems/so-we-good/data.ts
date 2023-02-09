import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "So we good",
  difficulty: "hard",
  number: 56,
  arguments: [{ name: "s", type: "string" }],
  tags: ["arrays"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
