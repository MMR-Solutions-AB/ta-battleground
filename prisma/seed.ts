import { prisma } from "../src/server/db/client";
import { syncDBWithFactions } from "./runners/syncDBWithFactions";
import { syncDBWithProblems } from "./runners/syncDBWithProblems";
import { syncDBWithWars } from "./runners/syncDBWithWars";
import { syncDBWithUserScores } from "./runners/syncDBWithUserScores";
import { syncDBWithWarScores } from "./runners/syncDBWithWarScores";

async function main() {
  // make sure all factions are there
  await syncDBWithFactions();

  // add and update all wars
  // await syncDBWithWars();
  // add and update all problems
  // await syncDBWithProblems();
  // sync db with correct war scores
  // await syncDBWithWarScores();
  // make sure all scores are up to date
  // this does not to be used unless user table gets out of sync
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
