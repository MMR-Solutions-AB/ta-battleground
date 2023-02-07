import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { WarCreate } from "./War";
import type { Problem, ProblemCreate } from "./Problem";

export async function getAllWars() {
  const warNames = readdirSync(join(__dirname, "./wars"));
  const wars: (WarCreate & { problems: ProblemCreate<string, string>[] })[] =
    [];

  for (let i = 0; i < warNames.length; i++) {
    const { data: warData }: { data: WarCreate } = await import(
      "./wars/" + warNames[i] + "/war.ts"
    );

    const problemsNames = readdirSync(
      join(__dirname, "./wars/" + warNames[i] + "/problems")
    );

    const problems: ProblemCreate<string, string>[] = [];

    for (let j = 0; j < problemsNames.length; j++) {
      const path = join(
        __dirname,
        "./wars/" + warNames[i],
        "./problems/" + problemsNames[j]
      );
      const description = readFileSync(
        join(path, "/description.md")
      ).toString();

      const { data }: { data: Problem<string, string> } = await import(
        path + "/data.ts"
      );

      problems.push({ ...data, description });
    }

    wars.push({ ...warData, problems });
  }

  return wars;
}
