import React from "react";
import type { RouterOutputs } from "@/utils";
import Image from "next/image";
import Card from "../leaderboard/Card";

interface FactionsDisplayProps {
  contenders: NonNullable<RouterOutputs["war"]["getCurrentWar"]>["contenders"];
  warId: string;
}

const FactionsDisplay: React.FC<FactionsDisplayProps> = ({
  contenders,
  warId,
}) => {
  return (
    <div className="my-5 grid gap-4 lg:my-10 lg:grid-cols-2">
      <div className="">
        <h4 className="mb-3 text-3xl font-bold">
          {contenders[0]?.faction.name}
        </h4>
        <div className="grid gap-4 lg:grid-cols-2">
          {contenders[0]?.faction.members?.map(({ user }, i) => {
            const submissions = user.submissions.filter(
              (submission) => submission.problem.warId === warId
            );

            const score = submissions.reduce(
              (prev, curr) => prev + curr.score,
              0
            );

            return (
              <Card
                key={user.id}
                user={user}
                index={i}
                score={score}
                targets={submissions.length}
              />
            );
          })}
        </div>
      </div>
      <div className="">
        <h4 className="mb-3 text-3xl font-bold">Factions</h4>
        <div className="grid gap-4 lg:grid-cols-2">
          {contenders.map((contender, i) => (
            <div
              className="relative rounded-b-md bg-bg-dimmed"
              key={contender.id}
            >
              <div className="relative h-20 w-full bg-red-500 lg:h-28">
                <Image
                  src={`/banners/${contender.faction.image}`}
                  alt={`${contender.faction.name} banner image`}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-3">
                <h4 className="text-lg italic tracking-wider">
                  {contender.faction.name}
                </h4>
                <p className="text-text-dimmed">
                  Score: {contender.score.toFixed(2)}
                </p>
              </div>
              <div className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-bg-dark text-sm">
                #{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactionsDisplay;
