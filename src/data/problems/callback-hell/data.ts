import type { Problem } from "../../Problem";

export const data: Problem<string | number, number> = {
  name: "Callback hell",
  difficulty: "easy",
  number: 41,
  arguments: [
    { name: "cb", type: "(n: number) => number" },
    { name: "n", type: "number" },
  ],
  tags: ["basics", "numbers", "functions"],
  testCases: [
    {
      input: ["(a) => a * 2", 4],
      output: 8,
    },
    {
      input: ["(a) => a * 3", 4],
      output: 12,
    },
    {
      input: ["(a) => a * 5", 3],
      output: 15,
    },
    {
      input: ["(a) => a * 0", 3],
      output: 0,
    },
  ],
};
