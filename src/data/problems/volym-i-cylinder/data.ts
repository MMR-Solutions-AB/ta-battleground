import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Volym i cylinder",
  difficulty: "easy",
  number: 27,
  arguments: [
    { name: "r", type: "number" },
    { name: "h", type: "number" },
  ],
  tags: ["numbers", "functions"],
  testCases: [
    {
      input: [2, 3],
      output: 37.7,
    },
    {
      input: [4, 5],
      output: 157.1,
    },
    {
      input: [5, 5],
      output: 392.7,
    },
    {
      input: [3, 9],
      output: 254.47,
    },
    {
      input: [2, 5],
      output: 62.83,
    },
  ],
};
