import type { Problem } from "../../Problem";

export const data: Problem<string, boolean> = {
  name: "Is palindrome",
  difficulty: "easy",
  number: 7,
  arguments: [{ name: "s", type: "string" }],
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
