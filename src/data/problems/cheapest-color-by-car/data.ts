import type { Problem } from "../../Problem";

export const data: Problem<any, string> = {
  name: "Carcar",
  difficulty: "medium",
  number: 60,
  arguments: [
    {
      name: "cars",
      type: "{make: string, model: string, year: number, color: string, price:number}[]",
    },
    { name: "color", type: "string" },
  ],
  isHidden: true,
  tags: ["numbers", "arrays", "objects", "functions"],
  testCases: [
    {
      input: [
        [
          {
            make: "Ford",
            model: "Mustang",
            year: 2020,
            color: "red",
            price: 35000,
          },
          {
            make: "Tesla",
            model: "Model S",
            year: 2019,
            color: "blue",
            price: 75000,
          },
          {
            make: "Chevy",
            model: "Camaro",
            year: 2018,
            color: "red",
            price: 30000,
          },
          {
            make: "BMW",
            model: "M3",
            year: 2020,
            color: "black",
            price: 60000,
          },
        ],
        `"red"`,
      ],
      output: "a",
    },
  ],
};
