import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Funny message",
  difficulty: "easy",
  number: 36,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"hello world"`],
      output: "hElLo wOrLd",
    },
    {
      input: [`"Light tHEme SCARES me"`],
      output: "lIgHt tHeMe sCaReS Me",
    },
    {
      input: [`"abc"`],
      output: "aBc",
    },
    {
      input: [`"xyxyxyx"`],
      output: "xYxYxYx",
    },
  ],
};
