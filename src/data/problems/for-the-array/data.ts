import type { Problem } from "../../Problem";

export const data: Problem<number, number[]> = {
  name: "For the array",
  difficulty: "easy",
  number: 30,
  arguments: [{ name: "n", type: "number" }],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [3],
      output: [1, 2, 3],
    },
    {
      input: [5],
      output: [1, 2, 3, 4, 5],
    },
    {
      input: [7],
      output: [1, 2, 3, 4, 5, 6, 7],
    },
  ],
};
