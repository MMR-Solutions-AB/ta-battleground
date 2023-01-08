import type { Problem } from "../../Problem";

export const data: Problem<string, string> = {
  name: "Reverse bits",
  difficulty: "easy",
  number: 47,
  arguments: [{ name: "s", type: "string" }],
  tags: ["strings"],
  testCases: [
    {
      input: [`"001101"`],
      output: "110010",
    },
    {
      input: [`"111"`],
      output: "000",
    },
    {
      input: [`"101110110010"`],
      output: "010001001101",
    },
    {
      input: [`"000011"`],
      output: "111100",
    },
  ],
};
