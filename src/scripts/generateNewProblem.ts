import inquirer from "inquirer";
import { join } from "path";
import { writeFileSync, mkdirSync } from "fs";
async function generateNewProblem() {
  const { problem_name } = await inquirer.prompt({
    name: "problem_name",
    type: "input",
    message: "Vad ska ditt problem heta?",
  });

  console.log(problem_name);

  const code = `import type { Problem } from "../../Problem";
\nexport const data: Problem<string, string> = {
  name: "${problem_name}",
  difficulty: "easy",
  number: ,
  arguments: ["s"],
  testCases: [
    {
      input: [\`"s"\`],
      output: "a",
    },
  ],
};
  `;

  mkdirSync(join(__dirname, "../data/problems", problem_name));
  writeFileSync(
    join(__dirname, "../data/problems", problem_name, "data.md"),
    `# ${problem_name}`
  );
  writeFileSync(
    join(__dirname, "../data/problems", problem_name, "data.ts"),
    code
  );
}

generateNewProblem();
