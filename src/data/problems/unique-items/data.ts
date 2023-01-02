import type { Problem } from "../../Problem";

export const data: Problem<number[], number[]> = {
  name: "Unique items",
  difficulty: "medium",
  number: 12,
  arguments: ["a"],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[4, 5, 1, 3, 5, 1]],
      output: [1, 3, 4, 5],
    },
    {
      input: [[2, 0, 0, 3]],
      output: [0, 2, 3],
    },
    {
      input: [[4, 4, 4]],
      output: [4],
    },
    {
      input: [[12, 18, 25]],
      output: [12, 18, 25],
    },
  ],
};
