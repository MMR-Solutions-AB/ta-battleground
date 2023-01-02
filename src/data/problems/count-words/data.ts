import type { Problem } from "../../Problem";

export const data: Problem<string, { [key: string]: number }> = {
  name: "Count words",
  difficulty: "easy",
  number: 19,
  arguments: ["s"],
  tags: ["strings", "objects"],
  testCases: [
    {
      input: [`"adam fredrik adam"`],
      output: { adam: 2, fredrik: 1 },
    },
    {
      input: [`"sen han ba sen hon ba"`],
      output: { sen: 2, han: 1, ba: 2, hon: 1 },
    },
    {
      input: [`"just the goat"`],
      output: { just: 1, the: 1, goat: 1 },
    },
    {
      input: [`"a a a a b b b c c"`],
      output: { a: 4, b: 3, c: 2 },
    },
  ],
};
