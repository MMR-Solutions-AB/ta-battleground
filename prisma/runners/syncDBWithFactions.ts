import { prisma } from "../../src/server/db/client";

// Just add new object to the baseFaction variable if you would like to add new faction
export async function syncDBWithFactions() {
  const factions = await prisma.faction.findMany();

  const baseFactions = [
    { name: "Typescript Titans" },
    { name: "Css Challengers" },
    { name: "React Raiders" },
    { name: "Node Ninjas" },
  ];

  if (factions.length < baseFactions.length) {
    await prisma.faction.createMany({
      data: baseFactions.filter(
        (f) => !factions.find((a) => a.name === f.name)
      ),
    });
  }
}
