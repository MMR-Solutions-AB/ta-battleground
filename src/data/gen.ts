import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { Problem, ProblemCreate } from "./Problem";

export async function main() {
  const problemsNames = readdirSync(
    join(__dirname, "../../../../../src/data", "./problems")
  );
  const problems: ProblemCreate<string, string>[] = [];

  for (let i = 0; i < problemsNames.length; i++) {
    const description = readFileSync(
      join(
        __dirname,
        "../../../../../src/data",
        "./problems/" + problemsNames[i] + "/description.md"
      )
    ).toString();

    const { data }: { data: Problem<string, string> } = await import(
      "./problems/" + problemsNames[i] + "/data.ts"
    );

    problems.push({ ...data, description });
  }

  return problems;
}
