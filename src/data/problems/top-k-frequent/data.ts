import type { Problem } from "../../Problem";

export const data: Problem<number[] | number, number[]> = {
  name: "Top k-frequent",
  difficulty: "medium",
  number: 17,
  arguments: ["nums", "k"],
  tags: ["arrays", "numbers"],
  testCases: [
    {
      input: [[1, 1, 1, 2, 2, 3], 2],
      output: [1, 2],
    },
    {
      input: [[6, 4, 4, 9, 9, 9, 9], 1],
      output: [9],
    },
    {
      input: [[2, 0, 0, 3, 1, 2, 1, 8], 3],
      output: [0, 1, 2],
    },
    {
      input: [[67], 1],
      output: [67],
    },
  ],
};
