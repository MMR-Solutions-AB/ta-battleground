import inquirer from "inquirer";
import { join } from "path";
import { writeFileSync, mkdirSync } from "fs";
import { getAllProblems } from "../data/getAllProblems";
import { getAllWars } from "../data/getAllWars";
import chalk from "chalk";
import { tags } from "../data/Problem";
import _ from "lodash";
import { tags } from "@/data/Problem";

async function generateNewProblem() {
  const { problem_name } = await inquirer.prompt({
    name: "problem_name",
    type: "input",
    message: "Vad ska ditt problem heta?",
  });

  const { difficulty } = await inquirer.prompt({
    name: "difficulty",
    type: "list",
    message: "Vilken svårighetsgrad ska uppgiften vara?",
    choices: ["easy", "medium", "hard"],
  });

  const { is_war_problem } = await inquirer.prompt({
    name: "is_war_problem",
    type: "confirm",
    message: "Är denna uppgift en war uppgift?",
  });

  let war_folder = "";

  if (is_war_problem) {
    const wars = await getAllWars();

    const { selected_war } = await inquirer.prompt({
      name: "selected_war",
      type: "list",
      message: "Vilken war ska denna uppgift vara med i?",
      choices: wars
        .sort((a, b) => b.number - a.number)
        .map((war) => `${war.number}. ${war.name}`),
    });
    const warPrefix = selected_war.split(". ")[1];
    war_folder = warPrefix.toLowerCase().split(" ").join("-");
  }

  const { selected_tags } = await inquirer.prompt({
    name: "selected_tags",

    type: "checkbox",
    message: "Vilka tags ska uppgiften ha?",
    choices: tags,
  });

  const folderName = war_folder
    ? join(
        `../data/wars`,
        war_folder,
        "/problems",
        problem_name.toLowerCase().split(" ").join("-")
      )
    : join("../data/problems", problem_name.toLowerCase().split(" ").join("-"));

  const allProblems = await getAllProblems();
  const allWars = await getAllWars();

  let highestNumber = 0;
  for (const problem of allProblems) {
    if (highestNumber < problem.number) {
      highestNumber = problem.number;
    }
  }

  for (const war of allWars) {
    for (const problem of war.problems) {
      if (highestNumber < problem.number) {
        highestNumber = problem.number;
      }
    }
  }

  highestNumber += 1;

  mkdirSync(join(__dirname, folderName));
  writeFileSync(
    join(__dirname, folderName, "description.md"),
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

  const code = `import type { Problem } from "${
    war_folder ? "../../" : ""
  }../../Problem";
  \nexport const data: Problem<string, string> = {
    name: "${_.capitalize(problem_name)}",
    difficulty: "${difficulty}",
    number: ${highestNumber},
    arguments: [{name: "s", type: "string"}],
    tags: ["${selected_tags.map((tag: any) => tag).join('", "')}"],
    testCases: [
      {
        input: [\`"s"\`],
        output: "a",
      },
    ],
  };
    `;
  writeFileSync(join(__dirname, folderName, "data.ts"), code);

  console.log(chalk.blue("Skapade en ny map med följande info:"));
  console.log(chalk.green("namn: " + _.capitalize(problem_name)));
  console.log(chalk.magenta("folder name: " + folderName));
  console.log(
    chalk.red(
      'tags: "' + selected_tags.map((tag: any) => tag).join('", "') + '"'
    )
  );
  console.log(chalk.yellow("difficulty: " + difficulty));
  console.log(chalk.cyan("number: " + highestNumber));
}

generateNewProblem();
