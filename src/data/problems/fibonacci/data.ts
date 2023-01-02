import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Fibonacci",
  difficulty: "medium",
  number: 14,
  arguments: ["s"],
  tags: ["numbers"],
  testCases: [
    {
      input: [`"s"`],
      output: "a",
    },
  ],
};
