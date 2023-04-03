import { prisma } from "../../src/server/db/client";
import { getAllProblems } from "../../src/data/getAllProblems";

// This function populates the DB with all problems
// It uses the number column on each war to create and override
// So, it is important that the number field is unique
// If new fields where to be added this file would need to be updated to support that
export async function syncDBWithProblems() {
  const problems = await getAllProblems();

  let promises: Promise<any>[] = [];

  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    if (!problem) continue;

    // för att inte overloada prisma så kör vi alla requests
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
