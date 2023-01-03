import type { Problem } from "../../Problem";

export const data: Problem<number[], boolean> = {
  name: "Can enter club",
  difficulty: "easy",
  number: 31,
  arguments: ["ages"],
  tags: ["basics", "numbers", "arrays"],
  testCases: [
    {
      input: [[20, 25, 30]],
      output: true,
    },
    {
      input: [[12, 20, 90]],
      output: false,
    },
    {
      input: [[10, 13]],
      output: false,
    },
    {
      input: [[18]],
      output: true,
    },
  ],
};
