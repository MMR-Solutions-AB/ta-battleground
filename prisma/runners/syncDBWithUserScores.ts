import { prisma } from "../../src/server/db/client";

// NOTE: This should only be used if the users inn the database scores are broken.
// this function resets all users score and number of completed problems by
// finding all there top submissions and generating a new total score
export async function syncDBWithUserScores() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const topSubmissions = await prisma.submission.findMany({
      where: {
        userId: user.id,
      },
      select: {
        score: true,
      },
      orderBy: {
        score: "desc",
      },
      distinct: ["problemId"],
    });

    const totalScore = parseFloat(
      topSubmissions.reduce((a, b) => a + b.score, 0).toFixed(2)
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        score: totalScore,
        completedProblems: topSubmissions.length,
      },
    });

    console.log(totalScore);
  }
}
