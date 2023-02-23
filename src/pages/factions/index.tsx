import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import Countdown from "@/components/Countdown";
import WrappedLayout from "@/components/layouts/WrappedLayout";
import ProblemsTable from "@/components/faction/ProblemsTable";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import FactionsDisplay from "@/components/faction/FactionsDisplay";

const Factions: NextPage = () => {
  const { data: war, isLoading } = trpc.war.getCurrentWar.useQuery();
  console.log(war);

  return (
    <WrappedLayout>
      <div className="pb-10">
        <h1
          aria-label="Faction wars"
          className="relative mx-auto w-max overflow-visible bg-[url('/faction-bg.svg')] bg-cover bg-clip-text text-center text-4xl font-black italic tracking-wider text-transparent [-webkit-background-clip:text] sm:text-5xl md:text-9xl"
        >
          Faction Wars
        </h1>
        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <BouncingBalls size="large" />
          </div>
        ) : (
          war && (
            <>
              <p className="mt-10 mb-2 text-center text-5xl font-bold italic md:text-6xl">
                #{war.number} {war.name}
              </p>
              <p className="text-center text-3xl font-bold">
                {new Date() > war.startTime ? "Ends in" : "Starts in"}
              </p>
              <Countdown startTime={war.startTime} endTime={war.endTime} />
              {new Date() > war.startTime && (
                <>
                  <FactionsDisplay contenders={war.contenders} warId={war.id} />
                  <h2 className="mb-3 text-3xl font-bold">Problems</h2>
                  <ProblemsTable problems={war.problems} />
                </>
              )}
            </>
          )
        )}
      </div>
    </WrappedLayout>
  );
};

export default Factions;
