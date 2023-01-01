import { prisma } from "../src/server/db/client";
import { gen } from "../src/data/gen";

async function main() {
  const problems = await gen();

  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    if (!problem) continue;

    await prisma.problem.upsert({
      where: { number: problem.number },
      update: {
        description: problem.description,
        name: problem.name,
        testCases: problem.testCases,
        arguments: problem.arguments,
        number: problem.number,
        difficulty: problem.difficulty,
      },
      create: {
        description: problem.description,
        name: problem.name,
        arguments: problem.arguments,
        testCases: problem.testCases,
        number: problem.number,
        difficulty: problem.difficulty,
      },
    });
  }
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
