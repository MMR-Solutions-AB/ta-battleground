import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Largest sum",
  difficulty: "medium",
  number: 28,
  arguments: [{ name: "arr", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
      output: 6,
    },
    {
      input: [[1, 2, 3, -8, 10]],
      output: 10,
    },
    {
      input: [[4, 8, 9, -5, 1]],
      output: 21,
    },
    {
      input: [[-4, -7, 6, 7, -8, 3]],
      output: 13,
    },
  ],
};
