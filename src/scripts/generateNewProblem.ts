import inquirer from "inquirer";
import { join } from "path";
import { writeFileSync, mkdirSync } from "fs";
import { getAllProblems } from "../data/getAllProblems";

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

  const allProblems = await getAllProblems();
  let highestNumber = 0;
  for (let i = 0; i < allProblems.length; i++) {
    if (highestNumber < (allProblems[i]?.number || 1)) {
      highestNumber = (allProblems[i]?.number || 0) + 1;
    }
  }

  console.log(problem_name);

  const code = `import type { Problem } from "../../Problem";
\nexport const data: Problem<string, string> = {
  name: "${problem_name}",
  difficulty: "${difficulty}",
  number: ${highestNumber},
  arguments: ["s"],
  tags: [""],
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
    join(__dirname, "../data/problems", problem_name, "description.md"),
    `# ${problem_name}

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
  writeFileSync(
    join(__dirname, "../data/problems", problem_name, "data.ts"),
    code
  );
}

generateNewProblem();
