import type { Problem } from "../../../../Problem";

export const data: Problem<number, number> = {
  name: "Liter milen",
  difficulty: "easy",
  number: 65,
  arguments: [
    { name: "distance", type: "number" },
    { name: "fuel", type: "number" },
  ],
  tags: ["numbers", "functions"],
  testCases: [
    {
      input: [100, 5],
      output: 2,
    },
    {
      input: [200, 6],
      output: 3,
    },
    {
      input: [70, 4],
      output: 2,
    },
    {
      input: [100, 5],
      output: 2,
    },
    {
      input: [100, 5],
      output: 2,
    },
  ],
};
