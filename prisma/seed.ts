import { prisma } from "../src/server/db/client";
import { getAllProblems } from "../src/data/getAllProblems";

async function main() {
  const problems = await getAllProblems();

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
        tags: {
          connectOrCreate: problem.tags.map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
            },
          })),
        },
      },
      create: {
        description: problem.description,
        name: problem.name,
        arguments: problem.arguments,
        testCases: problem.testCases,
        number: problem.number,
        difficulty: problem.difficulty,
        tags: {
          connectOrCreate: problem.tags.map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
            },
          })),
        },
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
