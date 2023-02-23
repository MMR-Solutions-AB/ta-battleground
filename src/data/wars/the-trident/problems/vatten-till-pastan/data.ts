import type { Problem } from "../../../../Problem";

export const data: Problem<number, number> = {
  name: "Vatten till pastan",
  difficulty: "easy",
  number: 57,
  arguments: [{ name: "n", type: "number" }],
  isHidden: true,
  tags: ["numbers", "functions"],
  testCases: [
    {
      input: [500],
      output: 2500,
    },
    {
      input: [200],
      output: 1000,
    },
    {
      input: [375],
      output: 1875,
    },
    {
      input: [250],
      output: 1250,
    },
    {
      input: [50],
      output: 250,
    },
  ],
};
