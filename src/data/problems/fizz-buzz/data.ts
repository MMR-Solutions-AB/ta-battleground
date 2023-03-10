import type { Problem } from "../../Problem";

export const data: Problem<number, (string | number)[]> = {
  name: "Fizz buzz",
  difficulty: "easy",
  number: 43,
  arguments: [{ name: "n", type: "number" }],
  tags: ["strings", "arrays"],
  testCases: [
    {
      input: [5],
      output: [1, 2, "Fizz", 4, "Buzz"],
    },
    {
      input: [15],
      output: [
        1,
        2,
        "Fizz",
        4,
        "Buzz",
        "Fizz",
        7,
        8,
        "Fizz",
        "Buzz",
        11,
        "Fizz",
        13,
        14,
        "FizzBuzz",
      ],
    },
    {
      input: [12],
      output: [
        1,
        2,
        "Fizz",
        4,
        "Buzz",
        "Fizz",
        7,
        8,
        "Fizz",
        "Buzz",
        11,
        "Fizz",
      ],
    },
    {
      input: [20],
      output: [
        1,
        2,
        "Fizz",
        4,
        "Buzz",
        "Fizz",
        7,
        8,
        "Fizz",
        "Buzz",
        11,
        "Fizz",
        13,
        14,
        "FizzBuzz",
        16,
        17,
        "Fizz",
        19,
        "Buzz",
      ],
    },
  ],
};
