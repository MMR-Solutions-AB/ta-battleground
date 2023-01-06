import { expect, test } from "vitest";
import { getAllProblems } from "../data/getAllProblems";
import { difficulties } from "../data/Problem";

test("Check for same number on problems", async () => {
  const problems = (await getAllProblems()).sort((a, b) => a.number - b.number);
  const problemNumbers = problems.map((problem) => problem.number);
  const uniqueProblemNumbers = Array.from(new Set(problemNumbers));

  expect(problemNumbers.length).toBe(uniqueProblemNumbers.length);
});

test("Check for same names on problems", async () => {
  const problems = await getAllProblems();
  const problemNames = problems.map((problem) => problem.name);
  const uniqueProblemNames = Array.from(new Set(problemNames));

  expect(problemNames.length).toBe(uniqueProblemNames.length);
});

test("Number of problems are correct", async () => {
  const problems = (await getAllProblems())
    .sort((a, b) => a.number - b.number)
    .map((p) => p.number);

  const numbers: number[] = [];
  for (let i = 0; i < problems.length; i++) {
    numbers.push(i + 1);
  }

  expect(problems).toEqual(numbers);
});
