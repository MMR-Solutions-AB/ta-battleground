import type { Problem } from "../../Problem";

export const data: Problem<
  string | number,
  Record<"name" | "age" | "city", string | number>
> = {
  name: "Create an object",
  difficulty: "easy",
  number: 53,
  arguments: [
    { name: "name", type: "string" },
    { name: "age", type: "number" },
    { name: "city", type: "string" },
  ],
  tags: ["basics", "objects"],
  testCases: [
    {
      input: [`"Alice"`, 21, `"New York"`],
      output: { name: "Alice", age: 21, city: "New York" },
    },
    {
      input: [`"Bob"`, 25, `"Chicago"`],
      output: { name: "Bob", age: 25, city: "Chicago" },
    },
    {
      input: [`"Lia"`, 56, `"Stockholm"`],
      output: { name: "Lia", age: 56, city: "Stockholm" },
    },
    {
      input: [`"Thomaz"`, 21, `"Stockholm"`],
      output: { name: "Thomaz", age: 21, city: "Stockholm" },
    },
  ],
};
