import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { Problem, ProblemCreate } from "./Problem";

export async function getAllProblems(basePath?: string) {
  const problemsNames = readdirSync(
    join(__dirname, basePath ?? "", "./problems")
  );

  const problems: ProblemCreate<string, string>[] = [];

  for (let i = 0; i < problemsNames.length; i++) {
    const path = join(
      __dirname,
      basePath ?? "",
      "./problems/" + problemsNames[i]
    );
    const description = readFileSync(join(path, "/description.md")).toString();

    const { data }: { data: Problem<string, string> } = await import(
      path + "/data.ts"
    );

    problems.push({ ...data, description });
  }

  return problems;
}
