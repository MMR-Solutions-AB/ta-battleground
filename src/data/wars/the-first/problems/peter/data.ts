import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Peter",
    difficulty: "hard",
    number: 59,
    arguments: [{name: "s", type: "string"}],
    tags: ["basics", "numbers"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    