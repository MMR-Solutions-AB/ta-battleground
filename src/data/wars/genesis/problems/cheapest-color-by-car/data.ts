import type { Problem } from "../../../../Problem";

export const data: Problem<
  | {
      brand: string;
      color: string;
      price: number;
    }[]
  | string,
  number
> = {
  name: "Cheapest color by car",
  difficulty: "medium",
  number: 60,
  arguments: [
    {
      name: "cars",
      type: "{brand: string, color: string, price:number}[]",
    },
    { name: "color", type: "string" },
  ],
  isHidden: true,
  tags: ["numbers", "arrays", "objects"],
  testCases: [
    {
      input: [
        [
          {
            brand: "Ford",
            color: "red",
            price: 35000,
          },
          {
            brand: "Tesla",
            color: "blue",
            price: 75000,
          },
          {
            brand: "Chevy",
            color: "red",
            price: 30000,
          },
          {
            brand: "BMW",
            color: "black",
            price: 60000,
          },
        ],
        `"red"`,
      ],
      output: 30000,
    },
    {
      input: [
        [
          { brand: "Tesla", color: "black", price: 35000 },
          { brand: "Tesla", color: "red", price: 75000 },
        ],
        `"blue"`,
      ],
      output: 0,
    },
    {
      input: [
        [
          { brand: "Toyota", color: "red", price: 35000 },
          { brand: "BMW", color: "orange", price: 75000 },
          { brand: "BMW", color: "pink", price: 150000 },
        ],
        `"pink"`,
      ],
      output: 150000,
    },
    {
      input: [
        [
          { brand: "Tesla", color: "black", price: 35000 },
          { brand: "Tesla", color: "black", price: 32000 },
          { brand: "Tesla", color: "black", price: 50000 },
          { brand: "Tesla", color: "black", price: 45000 },
          { brand: "Tesla", color: "black", price: 65000 },
          { brand: "Tesla", color: "black", price: 75000 },
        ],
        `"black"`,
      ],
      output: 32000,
    },
  ],
};
