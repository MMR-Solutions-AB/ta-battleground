import type { Problem } from "../../Problem";

export const data: Problem<number[] | number[][], boolean> = {
  name: "Fara vid havs",
  difficulty: "medium",
  number: 39,
  arguments: ["cords", "boats"],
  tags: ["arrays", "numbers"],
  testCases: [
    {
      input: [
        [1, 1],
        [
          [5, 1],
          [2, 2],
        ],
      ],
      output: true,
    },
    {
      input: [[0, 0], [[100, 100]]],
      output: false,
    },
    {
      input: [
        [10, 3],
        [
          [10, 30],
          [10, -30],
        ],
      ],
      output: false,
    },
    {
      input: [
        [12, 12],
        [
          [11, 12],
          [12, 11],
        ],
      ],
      output: true,
    },
  ],
};
