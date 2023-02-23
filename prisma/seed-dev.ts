import { prisma } from "../src/server/db/client";
import { getAllProblems } from "../src/data/getAllProblems";
import { getAllWars } from "../src/data/getAllWars";

async function syncDBWithWars() {
  const wars = await getAllWars();
  let warPromises: Promise<any>[] = [];

  const factions = await prisma.faction.findMany();

  for (let i = 0; i < wars.length; i++) {
    const war = wars[i];
    if (!war) continue;

    if (i % 10 === 0) {
      await Promise.all(warPromises);
      warPromises = [];
    }

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
            })),
          },
        },
        create: {
          name: war.name,
          number: war.number,
          startTime: war.startTime,
          endTime: war.endTime,
          problems: {
            create: war.problems.map((problem) => ({
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
            })),
          },
          contenders: {
            createMany: {
              data: factions.map((faction) => ({ factionId: faction.id })),
            },
          },
        },
      })
    );
  }

  await Promise.all(warPromises);
}

async function syncDBWithProblems() {
  const problems = await getAllProblems();

  let promises: Promise<any>[] = [];

  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    if (!problem) continue;

    if (i % 10 === 0) {
      await Promise.all(promises);
      promises = [];
    }

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
}

async function syncWithFactions() {
  const factionCount = await prisma.faction.count();

  if (factionCount < 4) {
    await prisma.faction.createMany({
      data: [
        { name: "Typescript Titans" },
        { name: "Css Challengers" },
        { name: "React Raiders" },
        { name: "Node Ninjas" },
      ],
    });
  }
}
async function main() {
  await syncWithFactions();
  await syncDBWithWars();
  await syncDBWithProblems();
  // const problems = await getAllProblems();
  // problems.sort((a, b) => a.number - b.number);
  // for (const problem of problems) {
  //   console.log(problem.number);
  // }
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
