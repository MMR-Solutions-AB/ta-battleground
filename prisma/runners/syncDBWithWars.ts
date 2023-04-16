import { prisma } from "../../src/server/db/client";
import { getAllWars } from "../../src/data/getAllWars";

// This function populates the DB with all wars
// It uses the number column on each war to create and override
// So, it is important that the number field is unique
// If new fields where to be added this file would need to be updated to support that
export async function syncDBWithWars() {
  const wars = await getAllWars();

  const factions = await prisma.faction.findMany();

  for (let i = 0; i < wars.length; i++) {
    const war = wars[i];
    if (!war) continue;

    await prisma.war.upsert({
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
    });
  }
}
