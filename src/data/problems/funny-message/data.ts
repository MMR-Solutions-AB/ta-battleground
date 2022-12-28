import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Funny message",
  difficulty: "easy",
  number: 6,
  testCases: [
    {
      input: ["hello world"],
      output: "hElLo wOrLd",
    },
    {
      input: ["Light tHEme SCARES me"],
      output: "lIgHt tHeMe sCaReS Me",
    },
    {
      input: ["abc"],
      output: "aBc",
    },
    {
      input: ["xyxyxyx"],
      output: "xYxYxYx",
    },
  ],
};
