import type { Problem } from "../../Problem";

export const data: Problem<any, number[]> = {
  name: "Den smala arrayn",
  difficulty: "medium",
  number: 55,
  arguments: [{ name: "arr", type: "array" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, [2, [3, 4], 5], [6]]],
      output: [1, 2, 3, 4, 5, 6],
    },
  ],
};
