import type { Problem } from "../../Problem";

export const data: Problem<
  { [key: string]: number },
  { [key: string]: number }
> = {
  name: "Merge tastic",
  difficulty: "medium",
  number: 22,
  arguments: [
    { name: "obj1", type: "Object.<string, number>" },
    { name: "obj2", type: "Object.<string, number>" },
  ],
  tags: ["strings", "objects"],
  testCases: [
    {
      input: [
        { a: 1, b: 2 },
        { a: 5, b: 9 },
      ],
      output: { a: 6, b: 11 },
    },
    {
      input: [{ nummer: 0, integer: 3 }, { nummer: 12 }],
      output: { nummer: 12, integer: 3 },
    },
    {
      input: [{ v: 195 }, { c: 6, r: 12 }],
      output: { v: 195, c: 6, r: 12 },
    },
  ],
};
