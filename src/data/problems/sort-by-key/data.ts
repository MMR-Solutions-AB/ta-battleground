import type { Problem } from "../../Problem";

export const data: Problem<{ [key: string]: number }, [string, number][]> = {
  name: "Sort by key",
  difficulty: "medium",
  number: 26,
  arguments: ["d"],
  tags: ["numbers", "strings", "arrays", "objects"],
  testCases: [
    {
      input: [{ a: 3, b: 2, c: 1 }],
      output: [
        ["c", 1],
        ["b", 2],
        ["a", 3],
      ],
    },
    {
      input: [{ matheus: 18, filip: 28, rasmus: 26 }],
      output: [
        ["matheus", 18],
        ["rasmus", 26],
        ["filip", 28],
      ],
    },
    {
      input: [{ bo3: 2015, iw: 2016 }],
      output: [
        ["bo3", 2015],
        ["iw", 2016],
      ],
    },
  ],
};
