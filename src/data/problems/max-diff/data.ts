import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Max diff",
  difficulty: "easy",
  number: 24,
  arguments: [{ name: "a", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      output: 4,
    },
    {
      input: [[10, 15, 12, 6]],
      output: 9,
    },
    {
      input: [[12, 13, 100, 1]],
      output: 99,
    },
    {
      input: [[90, 1]],
      output: 89,
    },
  ],
};
