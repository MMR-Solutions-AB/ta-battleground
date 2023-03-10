import { prisma } from "../src/server/db/client";
import { syncDBWithFactions } from "./runners/syncDbWithFactions";
import { syncDBWithProblems } from "./runners/syncDBWithProblems";
import { syncDBWithWars } from "./runners/syncDBWithWars";
import { syncDBWithUserScores } from "./runners/syncDBWithUserScores";

async function main() {
  // make sure all factions are there
  await syncDBWithFactions();

  // add and update all wars
  await syncDBWithWars();

  // add and update all problems
  await syncDBWithProblems();

  // make sure all scores are up to date
  // await syncDBWithUserScores();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
