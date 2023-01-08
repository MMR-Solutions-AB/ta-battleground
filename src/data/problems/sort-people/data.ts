import type { Problem } from "../../Problem";

export const data: Problem<
  { name: string; age: number }[],
  { name: string; age: number }[]
> = {
  name: "Sort people",
  difficulty: "easy",
  number: 34,
  arguments: [{ name: "people", type: "{name: string, age: number}" }],
  tags: ["basics", "arrays", "objects"],
  testCases: [
    {
      input: [
        [
          { name: "Filip", age: 28 },
          { name: "Matheus", age: 19 },
          { name: "Mr.Heavenstone", age: 21 },
        ],
      ],
      output: [
        { name: "Matheus", age: 19 },
        { name: "Mr.Heavenstone", age: 21 },
        { name: "Filip", age: 28 },
      ],
    },
    {
      input: [
        [
          { name: "Bob", age: 25 },
          { name: "Alice", age: 20 },
          { name: "Charlie", age: 30 },
        ],
      ],
      output: [
        { name: "Alice", age: 20 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 30 },
      ],
    },
    {
      input: [
        [
          { name: "Ronaldo", age: 37 },
          { name: "Messi", age: 35 },
          { name: "Neymar", age: 33 },
        ],
      ],
      output: [
        { name: "Neymar", age: 33 },
        { name: "Messi", age: 35 },
        { name: "Ronaldo", age: 37 },
      ],
    },
  ],
};
