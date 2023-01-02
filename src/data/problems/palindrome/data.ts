import type { Problem } from "../../Problem";

export const data: Problem<string, boolean> = {
  name: "Palindrome",
  difficulty: "easy",
  number: 7,
  arguments: ["s"],
  tags: ["strings"],
  testCases: [
    {
      input: [`"racecar"`],
      output: true,
    },
    {
      input: [`"tand"`],
      output: false,
    },
    {
      input: [`"abba"`],
      output: true,
    },
    {
      input: [`"pop pop"`],
      output: true,
    },
  ],
};
