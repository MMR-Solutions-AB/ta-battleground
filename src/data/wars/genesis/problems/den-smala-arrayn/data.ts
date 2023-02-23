import type { Problem } from "../../../../Problem";

export const data: Problem<any, number[]> = {
  name: "Den smala arrayn",
  difficulty: "easy",
  number: 55,
  isHidden: true,
  arguments: [{ name: "arr", type: "number[]" }],
  tags: ["numbers", "arrays"],
  testCases: [
    {
      input: [[1, [2, [3, 4], 5], [6]]],
      output: [1, 2, 3, 4, 5, 6],
    },
    {
      input: [[[1, 9], [5], [[[5], [8]]]]],
      output: [1, 9, 5, 5, 8],
    },
    {
      input: [[[3], [[[4, 8]]]]],
      output: [3, 4, 8],
    },
    {
      input: [[2]],
      output: [2],
    },
    {
      input: [[]],
      output: [],
    },
  ],
};
