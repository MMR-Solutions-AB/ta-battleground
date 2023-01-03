import type { Problem } from "../../Problem";

export const data: Problem<string[], string[]> = {
  name: "Uppercase array",
  difficulty: "easy",
  number: 37,
  arguments: ["arr"],
  tags: ["basics", "strings", "arrays"],
  testCases: [
    {
      input: [["hello", "world"]],
      output: ["HELLO", "WORLD"],
    },
    {
      input: [["ronALdo", "tHe", "GOAT"]],
      output: ["RONALDO", "THE", "GOAT"],
    },
    {
      input: [["SEWY", "SUi", "GOalZo"]],
      output: ["SEWY", "SUI", "GOALZO"],
    },
  ],
};
