import React from "react";
import type { RouterOutputs } from "@/utils";
import Image from "next/image";

interface FactionBannerProps {
  faction: NonNullable<RouterOutputs["user"]["getById"]>["faction"];
}

const FactionBanner: React.FC<FactionBannerProps> = ({ faction }) => {
  if (!faction) return null;

  const time = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "long",
  });

  return (
    <div className="relative my-3 p-5">
      <Image
        src={`/banners/${faction.faction.image}`}
        alt="faction banner"
        fill={true}
        className="inset-0 rounded-md object-cover"
      />
      <div className="relative z-10">
        <h2 className="text-3xl font-bold">
          {faction.faction.name}{" "}
          <span>{faction.faction.allTimeScore} Poäng</span>
        </h2>
        <p className="font-semibold">
          Medlem sen {time.format(faction.createdAt.getTime())}
        </p>
      </div>
    </div>
  );
};

export default FactionBanner;
