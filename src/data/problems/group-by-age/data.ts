import type { Problem } from "../../Problem";

export const data: Problem<
  Record<string, string | number>[],
  Record<number, string[]>
> = {
  name: "Group by age",
  difficulty: "medium",
  number: 52,
  arguments: [
    { name: "people", type: "{name: string, age: number, city: string}[]" },
  ],
  tags: ["arrays", "objects"],
  testCases: [
    {
      input: [
        [
          { name: "Alice", age: 21, city: "New York" },
          { name: "Bob", age: 25, city: "Chicago" },
          { name: "Charlie", age: 21, city: "New York" },
        ],
      ],
      output: { 21: ["Alice", "Charlie"], 25: ["Bob"] },
    },
    {
      input: [
        [
          { name: "David", age: 35, city: "San Francisco" },
          { name: "Eve", age: 40, city: "Los Angeles" },
          { name: "Frank", age: 35, city: "San Francisco" },
        ],
      ],
      output: { 35: ["David", "Frank"], 40: ["Eve"] },
    },
    {
      input: [
        [
          { name: "Lidia", age: 18, city: "Stockholm" },
          { name: "Eloa", age: 15, city: "Stockholm" },
          { name: "Machorie", age: 9, city: "Stockholm" },
        ],
      ],
      output: { 18: ["Lidia"], 15: ["Eloa"], 9: ["Machorie"] },
    },
    {
      input: [[]],
      output: {},
    },
  ],
};
