import type { Problem } from "../../../../Problem";

export const data: Problem<{ name: string; price: number }[], number> = {
  name: "Inköpslistan",
  difficulty: "easy",
  number: 61,
  arguments: [{ name: "s", type: "{name: string , price: number}[]" }],
  tags: ["arrays", "objects"],
  testCases: [
    {
      input: [
        [
          { name: "mandarin", price: 10 },
          { name: "mango", price: 7 },
          { name: "jordgubbar", price: 5 },
        ],
      ],
      output: 22,
    },
    {
      input: [
        [
          { name: "nuts", price: 20 },
          { name: "coffe", price: 2 },
          { name: "capri-sun", price: 2 },
        ],
      ],
      output: 24,
    },
    {
      input: [
        [
          { name: "oyster", price: 15 },
          { name: "potato", price: 5 },
          { name: "tomato", price: 3 },
        ],
      ],
      output: 23,
    },
    {
      input: [
        [
          { name: "apple", price: 2 },
          { name: "banana", price: 4 },
          { name: "orange", price: 1 },
        ],
      ],
      output: 7,
    },
  ],
};
