import type { Problem } from "../../Problem";

export const data: Problem<number[], number[]> = {
  name: "Running sum of array",
  difficulty: "easy",
  number: 50,
  arguments: [{ name: "nums", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4]],
      output: [1, 3, 6, 10],
    },
    {
      input: [[5, 2, 2, 1]],
      output: [5, 7, 9, 10],
    },
    {
      input: [[7, 8, 9]],
      output: [7, 15, 24],
    },
    {
      input: [[12, 13]],
      output: [12, 25],
    },
  ],
};
