import type { Problem } from "../../../../Problem";

export const data: Problem<number, number> = {
  name: "Stairway to heaven",
  difficulty: "medium",
  number: 54,
  isHidden: true,
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
      input: [57],
      output: 111,
    },
    {
      input: [1],
      output: 1,
    },
    {
      input: [0],
      output: 1,
    },
    {
      input: [14],
      output: 25,
    },
    {
      input: [9],
      output: 15,
    },
  ],
};
