import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Longest palindromic substring",
  difficulty: "hard",
  number: 16,
  arguments: ["s"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"adxyxlo"`],
      output: "xyx",
    },
    {
      input: [`"abc"`],
      output: "",
    },
    {
      input: [`"aba"`],
      output: "aba",
    },
    {
      input: [`"lololalolol"`],
      output: "lolol",
    },
    {
      input: [`"abcdeed"`],
      output: "deed",
    },
  ],
};
