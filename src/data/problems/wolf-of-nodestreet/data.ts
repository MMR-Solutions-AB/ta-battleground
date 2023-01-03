import type { Problem } from "../../Problem";

export const data: Problem<number[], number> = {
  name: "Wolf of nodestreet",
  difficulty: "medium",
  number: 29,
  arguments: ["prices"],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[7, 1, 5, 3, 6, 4]],
      output: 5,
    },
    {
      input: [[80, 70, 60, 50]],
      output: 0,
    },
    {
      input: [[12, 18, 22, 5, 6, 4, 16]],
      output: 12,
    },
    {
      input: [[5, 3, 7, 4, 8, 5]],
      output: 5,
    },
  ],
};
