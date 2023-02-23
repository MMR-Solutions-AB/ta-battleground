import inquirer from "inquirer";
import { join } from "path";
import { writeFileSync, mkdirSync } from "fs";
import { getAllWars } from "../data/getAllWars";
import chalk from "chalk";
import _ from "lodash";

async function generateNewProblem() {
  const { war_name } = await inquirer.prompt({
    name: "war_name",
    type: "input",
    message: "Vad ska detta war heta?",
  });

  const folderName = war_name.toLowerCase().split(" ").join("-");

  const allWars = await getAllWars();
  let highestNumber = 0;
  for (const war of allWars) {
    if (highestNumber < war.number) {
      highestNumber = war.number;
    }
  }

  highestNumber += 1;

  mkdirSync(join(__dirname, "../data/wars", folderName));
  mkdirSync(join(__dirname, "../data/wars", folderName, "./problems"));
  writeFileSync(
    join(__dirname, "../data/wars", folderName, "war.ts"),
    `import type { WarCreate } from "../../War";

export const data: WarCreate = {
  name: "${_.capitalize(war_name)}",
  number: ${highestNumber},
  startTime: new Date("10 feb 2023"),
  endTime: new Date("26 mars 2023"),
};`
  );

  console.log(chalk.blue("Skapade en ny map med följande info:"));
  console.log(chalk.magenta("folder name: " + folderName));
  console.log(chalk.green("namn: " + _.capitalize(war_name)));
  console.log(chalk.cyan("number: " + highestNumber));
}

generateNewProblem();
