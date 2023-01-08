import type { Problem } from "../../Problem";

export const data: Problem<number, number[][]> = {
  name: "Unique pairs",
  difficulty: "medium",
  number: 25,
  arguments: [{ name: "n", type: "number" }],
  tags: ["arrays", "numbers"],
  testCases: [
    {
      input: [2],
      output: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
    },
    {
      input: [3],
      output: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 2],
        [2, 3],
        [3, 3],
      ],
    },
    {
      input: [1],
      output: [
        [0, 0],
        [0, 1],
        [1, 1],
      ],
    },
  ],
};
