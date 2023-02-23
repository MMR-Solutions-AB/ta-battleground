import type { Problem } from "../../../../Problem";

export const data: Problem<{ width: number; length: number }[], number> = {
  name: "Total area",
  difficulty: "easy",
  number: 72,
  arguments: [{ name: "houses", type: "{width: number, length: number}[]" }],
  isHidden: true,
  tags: ["numbers", "objects"],
  testCases: [
    {
      input: [
        [
          { width: 10, length: 20 },
          { width: 5, length: 15 },
          { width: 20, length: 25 },
        ],
      ],
      output: 875,
    },
    {
      input: [
        [
          { width: 10, length: 10 },
          { width: 5, length: 5 },
          { width: 10, length: 15 },
        ],
      ],
      output: 275,
    },
    {
      input: [
        [
          { width: 10, length: 5 },
          { width: 5, length: 2 },
          { width: 10, length: 10 },
        ],
      ],
      output: 160,
    },
    {
      input: [
        [
          { width: 5, length: 5 },
          { width: 3, length: 2 },
          { width: 10, length: 10 },
        ],
      ],
      output: 131,
    },
  ],
};
