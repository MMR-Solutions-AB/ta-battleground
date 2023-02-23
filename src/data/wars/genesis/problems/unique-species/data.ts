import type { Problem } from "../../../../Problem";

export const data: Problem<string[], number> = {
  name: "Unique species",
  difficulty: "medium",
  number: 59,
  arguments: [{ name: "animals", type: "string[]" }],
  tags: ["arrays"],
  testCases: [
    {
      input: [["zebra", "häst", "lejon", "gorilla", "elefant"]],
      output: 5,
    },
    {
      input: [["hund", "lejon", "gorilla", "lejon", "hund"]],
      output: 3,
    },
    {
      input: [["råtta", "bird", "zebra", "gorilla", "råtta"]],
      output: 4,
    },
    {
      input: [["häst", "hund", "lejon", "häst", "kamel"]],
      output: 4,
    },
  ],
};
