import type { Problem } from "../../Problem";

export const data: Problem<
  { name: string; distance: number; damaged: boolean }[],
  any
> = {
  name: "Rockets in need",
  difficulty: "easy",
  number: 5,
  arguments: ["rockets"],
  tags: ["arrays", "objects"],
  testCases: [
    {
      input: [
        [
          { name: "aa", distance: 58, damaged: false },
          { name: "bb", distance: 12, damaged: true },
          { name: "cc", distance: 45, damaged: true },
        ],
      ],
      output: { bb: 12, cc: 45 },
    },
    {
      input: [
        [
          { name: "xx", distance: 5, damaged: false },
          { name: "yy", distance: 98, damaged: false },
        ],
      ],
      output: {},
    },
    {
      input: [[]],
      output: {},
    },
    {
      input: [
        [
          { name: "m", distance: 9, damaged: true },
          { name: "xyx", distance: 9, damaged: true },
        ],
      ],
      output: { m: 9, xyx: 9 },
    },
  ],
};
