import type { Problem } from "../../../../Problem";

export const data: Problem<number, string> = {
  name: "Buy apartment",
  difficulty: "easy",
  number: 67,
  arguments: [
    { name: "price", type: "number" },
    { name: "bank", type: "number" },
  ],
  tags: ["numbers"],
  testCases: [
    {
      input: [5000000, 1200000],
      output: "SÅLD",
    },
    {
      input: [13000000, 1200000],
      output: "Medges ej",
    },
    {
      input: [2000000, 340000],
      output: "SÅLD",
    },
    {
      input: [1000000, 160000],
      output: "Medges ej",
    },
  ],
};
