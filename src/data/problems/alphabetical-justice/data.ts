import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Alphabetical justice",
  difficulty: "easy",
  number: 38,
  arguments: ["s"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"luciocode"`],
      output: "ccdeiloou",
    },
    {
      input: [`"lia"`],
      output: "ail",
    },
    {
      input: [`"thomaz"`],
      output: "ahmotz",
    },
    {
      input: [`"nali"`],
      output: "ailn",
    },
  ],
};
