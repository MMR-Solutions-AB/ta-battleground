import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { Problem, ProblemCreate } from "./Problem";

export async function getAllProblems() {
  const problemsNames = readdirSync(join(__dirname, "./problems"));
  const problems: ProblemCreate<string, string>[] = [];

  for (let i = 0; i < problemsNames.length; i++) {
    const description = readFileSync(
      join(__dirname, "./problems/" + problemsNames[i] + "/description.md")
    ).toString();

    const { data }: { data: Problem<string, string> } = await import(
      "./problems/" + problemsNames[i] + "/data.ts"
    );

    problems.push({ ...data, description });
  }

  return problems;
}
