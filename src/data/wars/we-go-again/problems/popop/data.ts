import type { Problem } from "../../../../Problem";
  
export const data: Problem<string, string> = {
    name: "Popop",
    difficulty: "easy",
    number: 61,
    arguments: [{name: "s", type: "string"}],
    tags: ["arrays", "basics", "numbers", "objects", "strings", "functions"],
    testCases: [
      {
        input: [`"s"`],
        output: "a",
      },
    ],
  };
    