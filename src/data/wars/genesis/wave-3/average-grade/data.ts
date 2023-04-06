import type { Problem } from "../../../../Problem";

export const data: Problem<number[], number> = {
  name: "Average grade",
  difficulty: "easy",
  number: 66,
  arguments: [{ name: "grades", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[70, 65, 75, 80, 60, 55]],
      output: 68,
    },
    {
      input: [[90, 85, 100, 95, 80]],
      output: 91,
    },
    {
      input: [[80, 91, 65, 30, 76, 98]],
      output: 73,
    },
    {
      input: [[60, 45, 100, 100, 32, 83]],
      output: 70,
    },
  ],
};
