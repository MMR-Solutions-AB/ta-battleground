import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Fibonacci",
  difficulty: "medium",
  number: 14,
  arguments: [{ name: "n", type: "number" }],
  tags: ["numbers"],
  testCases: [
    {
      input: [4],
      output: 3,
    },
    {
      input: [7],
      output: 13,
    },
    {
      input: [8],
      output: 21,
    },
    {
      input: [9],
      output: 34,
    },
  ],
};
