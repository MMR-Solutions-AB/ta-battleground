import { prisma } from "../../src/server/db/client";
import { type Prisma } from "@prisma/client";

// Just add new object to the baseFaction variable if you would like to add new faction
export async function syncDBWithFactions() {
  const factions = await prisma.faction.findMany();

  const baseFactions: Prisma.FactionCreateInput[] = [
    { name: "Typescript Titans", image: "banner-1.svg" },
    { name: "CSS Challengers", image: "banner-2.svg" },
    { name: "React Raiders", image: "banner-3.svg" },
    { name: "Node Ninjas", image: "banner-4.svg" },
  ];

  if (factions.length < baseFactions.length) {
    await prisma.faction.createMany({
      data: baseFactions.filter(
        (f) => !factions.find((a) => a.name === f.name)
      ),
    });
  }
}
