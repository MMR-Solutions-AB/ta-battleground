import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import Countdown from "@/components/Countdown";
import Image from "next/image";
import WrappedLayout from "@/components/layouts/WrappedLayout";
import ProblemsTable from "@/components/faction/ProblemsTable";

const Faction: NextPage = () => {
  const { data } = trpc.war.getCurrentWar.useQuery();

  return (
    <WrappedLayout>
      <div className="pb-10">
        <h1 className="relative mx-auto w-max overflow-visible bg-[url('/faction-bg-2.svg')] bg-cover bg-clip-text text-center text-4xl font-black italic tracking-wider text-transparent [-webkit-background-clip:text] sm:text-5xl md:text-9xl">
          Faction Wars
          {/* <Image
          src={"/faction-bg.svg"}
          fill={true}
          style={{ objectFit: "cover", zIndex: -1 }}
          // className="max-h-[300px] lg:max-h-[500px]"
          alt="blob bg"
        /> */}
        </h1>
        {data && (
          <>
            <p className="mt-10 text-center font-serif text-3xl font-bold">
              {new Date() > data.startTime ? "Ends in" : "Starts in"}
            </p>
            <Countdown startTime={data.startTime} endTime={data.endTime} />

            <h2 className="mb-3 text-3xl font-bold">Problems</h2>
            <ProblemsTable problems={data.problems} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        )}
      </div>
    </WrappedLayout>
  );
};

export default Faction;
