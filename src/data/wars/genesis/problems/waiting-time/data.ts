import type { Problem } from "../../../../Problem";

export const data: Problem<object[], number> = {
  name: "Waiting time",
  difficulty: "easy",
  number: 65,
  arguments: [
    { name: "patients", type: "{arrivalTime: number, startTime: number}[]" },
  ],
  tags: ["numbers", "objects", "functions"],
  testCases: [
    {
      input: [
        [
          { arrivalTime: 28800, startTime: 29000 },
          { arrivalTime: 28900, startTime: 29100 },
          { arrivalTime: 29000, startTime: 29200 },
        ],
      ],
      output: 200,
    },
    {
      input: [[{ arrivalTime: 1000, startTime: 1500 }]],
      output: 500,
    },
    {
      input: [
        [
          { arrivalTime: 0, startTime: 100 },
          { arrivalTime: 0, startTime: 500 },
          { arrivalTime: 0, startTime: 200 },
          { arrivalTime: 0, startTime: 420 },
        ],
      ],
      output: 305,
    },
    {
      input: [
        [
          { arrivalTime: 28800, startTime: 29100 },
          { arrivalTime: 28900, startTime: 29250 },
          { arrivalTime: 29000, startTime: 29400 },
        ],
      ],
      output: 350,
    },
  ],
};
