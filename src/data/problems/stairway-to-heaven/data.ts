import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Stairway to heaven",
  difficulty: "hard",
  number: 54,
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
  ],
};
