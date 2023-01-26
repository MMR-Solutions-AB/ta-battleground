import inquirer from "inquirer";
import { join } from "path";
import { writeFileSync, mkdirSync } from "fs";
import { getAllProblems } from "../data/getAllProblems";
import chalk from "chalk";
import _ from "lodash";
import { tags } from "@/data/Problem";

async function generateNewProblem() {
  const { problem_name } = await inquirer.prompt({
    name: "problem_name",
    type: "input",
    message: "Vad ska ditt problem heta?",
  });

  const folderName = problem_name.toLowerCase().split(" ").join("-");

  const { difficulty } = await inquirer.prompt({
    name: "difficulty",
    type: "list",
    message: "Vilken svårighetsgrad ska uppgiften vara?",
    choices: ["easy", "medium", "hard"],
  });

  const { selectedTags } = await inquirer.prompt({
    name: "selectedTags",
    type: "checkbox",
    message: "Vilka tags ska uppgiften ha?",
    choices: tags,
  });

  const { isHidden } = await inquirer.prompt({
    name: "isHidden",
    type: "confirm",
    message: "Ska denna uppgift vara hidden?",
    default: true,
  });

  console.log(isHidden);

  const allProblems = await getAllProblems();
  let highestNumber = 0;
  for (const problem of allProblems) {
    if (highestNumber < problem.number) {
      highestNumber = problem.number;
    }
  }

  highestNumber += 1;

  mkdirSync(join(__dirname, "../data/problems", folderName));
  writeFileSync(
    join(__dirname, "../data/problems", folderName, "description.md"),
    `# ${_.capitalize(problem_name)}

Skriv en funktion **${_.camelCase(
      problem_name
    )}(s)** som tar emot en array av strängar. Funktionen ska returnera en samma array fast med varje sträng med stora bokstäver
      
## Exempel 1

**_Input_**

\`\`\`bash
s = "racecar"
\`\`\`

**_Output_**

\`\`\`bash
true
\`\`\`

**_Förklaring_**

En förklaring
  `
  );

  const code = `import type { Problem } from "../../Problem";
  \nexport const data: Problem<string, string> = {
    name: "${_.capitalize(problem_name)}",
    difficulty: "${difficulty}",
    number: ${highestNumber},
    arguments: [{name: "s", type: "string"}],${
      isHidden ? `\n\t\tisHidden: true,` : ""
    }
    tags: [${selectedTags.map((a: string) => `"${a}"`).join(", ")}],
    testCases: [
      {
        input: [\`"s"\`],
        output: "a",
      },
    ],
  };
    `;
  writeFileSync(
    join(__dirname, "../data/problems", folderName, "data.ts"),
    code
  );

  console.log(chalk.blue("Skapade en ny map med följande info:"));
  console.log(chalk.magenta("folder name: " + folderName));
  console.log(chalk.green("namn: " + _.capitalize(problem_name)));
  console.log(chalk.yellow("difficulty: " + difficulty));
  console.log(chalk.cyan("number: " + highestNumber));
}

generateNewProblem();
