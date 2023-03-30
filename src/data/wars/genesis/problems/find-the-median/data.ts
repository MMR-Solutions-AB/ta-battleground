import type { Problem } from "../../../../Problem";

export const data: Problem<number[], number> = {
  name: "Find the median",
  difficulty: "medium",
  number: 56,
  arguments: [{ name: "arr", type: "array" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      output: 3,
    },
    {
      input: [[1, 3, 5, 7, 10]],
      output: 5,
    },
    {
      input: [[4, 20, 10, 5]],
      output: 15,
    },
    {
      input: [[100, 7, 15]],
      output: 7,
    },
    {
      input: [[1, 2, 100, 120, 3, 4]],
      output: 110,
    },
  ],
};
