import type { Problem } from "../../Problem";

export const data: Problem<string, boolean> = {
  name: "Palindrome",
  difficulty: "easy",
  number: 7,
  testCases: [
    {
      input: ["racecar"],
      output: true,
    },
    {
      input: ["adam"],
      output: false,
    },
    {
      input: ["abba"],
      output: true,
    },
    {
      input: ["pop pop"],
      output: true,
    },
  ],
};
