import type { Problem } from "../../../../Problem";

export const data: Problem<number, number> = {
  name: "Stairway to heaven",
  difficulty: "hard",
  number: 58,
  arguments: [{ name: "n", type: "number" }],
  tags: ["functions"],
  testCases: [
    {
      input: [2],
      output: 2,
    },
    {
      input: [4],
      output: 5,
    },
    {
      input: [30],
      output: 1346269,
    },
    {
      input: [1],
      output: 1,
    },
    {
      input: [0],
      output: 0,
    },
    {
      input: [14],
      output: 610,
    },
    {
      input: [9],
      output: 55,
    },
  ],
};
