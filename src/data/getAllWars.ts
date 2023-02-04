import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { WarCreate } from "./War";
import type { Problem, ProblemCreate } from "./Problem";
import { getAllProblems } from "./getAllProblems";

export async function getAllWars() {
  const warNames = readdirSync(join(__dirname, "./wars"));
  const wars: (WarCreate & { problems: ProblemCreate<string, string>[] })[] =
    [];

  for (let i = 0; i < warNames.length; i++) {
    const { data }: { data: WarCreate } = await import(
      "./wars/" + warNames[i] + "/war.ts"
    );

    console.log(data);

    const problems = await getAllProblems("./wars/" + warNames[i]);
    console.log(problems);

    wars.push({ ...data, problems });
  }

  console.log(wars);

  return wars;
}

getAllWars();
