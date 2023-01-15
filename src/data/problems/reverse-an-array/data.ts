import type { Problem } from "../../Problem";

export const data: Problem<(number | string)[], (number | string)[]> = {
  name: "Reverse an array",
  difficulty: "easy",
  number: 51,
  arguments: [{ name: "arr", type: "(string | number)[]" }],
  tags: ["basics", "arrays"],
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      output: [5, 4, 3, 2, 1],
    },
    {
      input: [["a", "b", "c", "d"]],
      output: ["d", "c", "b", "a"],
    },
    {
      input: [["m", "a", "t", "u"]],
      output: ["u", "t", "a", "m"],
    },
    {
      input: [[1, 9, 5]],
      output: [5, 9, 1],
    },
  ],
};
