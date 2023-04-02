import { prisma } from "../../src/server/db/client";

export async function syncDBWithWarScores() {
  const wars = await prisma.war.findMany();

  for (const war of wars) {
    const factions = await prisma.factionWarContender.findMany({
      where: {
        warId: war.id,
      },
      select: {
        faction: {
          select: {
            id: true,
            members: true,
            name: true,
          },
        },
      },
    });

    for (const { faction } of factions) {
      const submissions = await prisma.submission.findMany({
        where: {
          problem: {
            warId: war.id,
          },
          user: {
            faction: {
              factionId: faction.id,
            },
          },
        },
        select: {
          score: true,
        },
        orderBy: {
          score: "desc",
        },
        distinct: ["problemId", "userId"],
      });

      console.log("submissons: ", faction.name);
      const newContenderScore =
        submissions.reduce((a, b) => a + b.score, 0) /
        (faction.members.length || 1);
      console.log(parseFloat(newContenderScore.toFixed(2)));

      await prisma.factionWarContender.update({
        where: {
          factionId_warId: {
            factionId: faction.id,
            warId: war.id,
          },
        },
        data: {
          score: parseFloat(newContenderScore.toFixed(2)),
        },
      });

      //   console.log(submissions);
    }
  }
}
