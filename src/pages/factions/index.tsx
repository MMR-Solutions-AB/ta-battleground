import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import Countdown from "@/components/Countdown";
import WrappedLayout from "@/components/layouts/WrappedLayout";
import ProblemsTable from "@/components/faction/ProblemsTable";
import Card from "@/components/leaderboard/Card";
import Image from "next/image";

const Factions: NextPage = () => {
  const { data: war } = trpc.war.getCurrentWar.useQuery();
  console.log(war);

  return (
    <WrappedLayout>
      <div className="pb-10">
        <h1 className="relative mx-auto w-max overflow-visible bg-[url('/faction-bg-2.svg')] bg-cover bg-clip-text text-center text-4xl font-black italic tracking-wider text-transparent [-webkit-background-clip:text] sm:text-5xl md:text-9xl">
          Faction Wars
        </h1>
        {war && (
          <>
            <p className="mt-10 text-center font-serif text-3xl font-bold">
              {new Date() > war.startTime ? "Ends in" : "Starts in"}
            </p>
            <Countdown startTime={war.startTime} endTime={war.endTime} />
            {new Date() > war.startTime && (
              <>
                <div className="my-5 grid gap-4 lg:my-10 lg:grid-cols-2">
                  <div className="">
                    <h4 className="mb-3 text-3xl">
                      {war.contenders[0]?.faction.name}
                    </h4>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {war.contenders[0]?.faction.members?.map(
                        ({ user }, i) => {
                          const submissions = user.submissions.filter(
                            (submission) => submission.problem.warId === war.id
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
                        }
                      )}
                    </div>
                  </div>
                  <div className="">
                    <h4 className="mb-3 text-3xl font-bold">Contenders</h4>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {war.contenders.map((contender, i) => (
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

                <h2 className="mb-3 text-3xl font-bold">Problems</h2>
                <ProblemsTable problems={war.problems} />
                <pre>{JSON.stringify(war, null, 2)}</pre>
              </>
            )}
          </>
        )}
      </div>
    </WrappedLayout>
  );
};

export default Factions;
