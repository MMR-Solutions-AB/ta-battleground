import type { Problem } from "../../Problem";

export const data: Problem<object[], number> = {
  name: "Waiting time",
  difficulty: "easy",
  number: 73,
  arguments: [
    { name: "patients", type: "{arrivalTime: number, startTime: number}[]" },
  ],
  isHidden: true,
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
      output: 100,
    },
    {
      input: [
        [
          { arrivalTime: 28800, startTime: 29000 },
          { arrivalTime: 28900, startTime: 29200 },
          { arrivalTime: 29000, startTime: 29400 },
        ],
      ],
      output: 150,
    },
  ],
};
