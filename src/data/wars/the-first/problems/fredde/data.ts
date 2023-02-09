import type { Problem } from "../../../../Problem";

export const data: Problem<string, string> = {
  name: "Fredde",
  difficulty: "easy",
  number: 57,
  arguments: [{ name: "s", type: "string" }],
  tags: ["arrays"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
