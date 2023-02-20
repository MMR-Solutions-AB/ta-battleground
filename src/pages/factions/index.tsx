import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import Countdown from "@/components/Countdown";
import WrappedLayout from "@/components/layouts/WrappedLayout";
import ProblemsTable from "@/components/faction/ProblemsTable";
import Card from "@/components/leaderboard/Card";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import Image from "next/image";

const Factions: NextPage = () => {
  const { data: war, isLoading } = trpc.war.getCurrentWar.useQuery();
  console.log(war);

  return (
    <WrappedLayout>
      <div className="pb-10">
        <h1 className="relative mx-auto w-max overflow-visible bg-[url('/banners/banner-2.svg')] bg-cover bg-clip-text text-center text-4xl font-black italic tracking-wider text-transparent [-webkit-background-clip:text] sm:text-5xl md:text-9xl">
          Faction Wars
        </h1>
        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <BouncingBalls size="large" />
          </div>
        ) : (
          war && (
            <>
              <p className="mt-10 text-center text-3xl font-bold">
                {new Date() > war.startTime ? "Ends in" : "Starts in"}
              </p>
              <Countdown startTime={war.startTime} endTime={war.endTime} />
              {new Date() > war.startTime && (
                <>
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
