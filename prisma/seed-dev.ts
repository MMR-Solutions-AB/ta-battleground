import { prisma } from "../src/server/db/client";
import { getAllProblems } from "../src/data/getAllProblems";
import { getAllWars } from "../src/data/getAllWars";

async function main() {
  const problems = await getAllProblems();

  const promises: Promise<any>[] = [];

  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    if (!problem) continue;

    promises.push(
      prisma.problem.upsert({
        where: { number: problem.number },
        update: {
          description: problem.description,
          name: problem.name,
          testCases: problem.testCases,
          arguments: problem.arguments,
          number: problem.number,
          difficulty: problem.difficulty,
          tags: {
            set: [],
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
      })
    );
  }

  await Promise.all(promises);

  const wars = await getAllWars();
  const warPromises: Promise<any>[] = [];

  for (let i = 0; i < wars.length; i++) {
    const war = wars[i];
    if (!war) continue;

    warPromises.push(
      prisma.war.upsert({
        where: { number: war.number },
        update: {
          name: war.name,
          number: war.number,
          startTime: war.startTime,
          endTime: war.endTime,
          problems: {
            upsert: war.problems.map((problem) => ({
              where: { number: problem.number },
              update: {
                description: problem.description,
                name: problem.name,
                testCases: problem.testCases,
                arguments: problem.arguments,
                number: problem.number,
                difficulty: problem.difficulty,
                tags: {
                  set: [],
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
            })),
          },
        },
        create: {
          name: war.name,
          number: war.number,
          startTime: war.startTime,
          endTime: war.endTime,
          problems: {
            createMany: {
              data: war.problems.map((problem) => ({
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
              })),
            },
          },
        },
      })
    );
  }

  await Promise.all(warPromises);
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
