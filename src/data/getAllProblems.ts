import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { Problem, ProblemCreate } from "./Problem";
import { getAllWars } from "./getAllWars";

export async function getAllProblems() {
  const wars = await getAllWars();
  const problems = wars.reduce<ProblemCreate<string, string>[]>(
    (prev, curr) => prev.concat(curr.problems),
    []
  );
  const problemsNames = readdirSync(join(__dirname, "./problems"));

  for (let i = 0; i < problemsNames.length; i++) {
    const path = join(__dirname, "./problems/" + problemsNames[i]);
    const description = readFileSync(join(path, "/description.md")).toString();

    const { data }: { data: Problem<string, string> } = await import(
      path + "/data.ts"
    );

    problems.push({ ...data, description });
  }

  return problems;
}
