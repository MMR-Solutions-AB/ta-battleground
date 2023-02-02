import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import Countdown from "@/components/Countdown";
import Image from "next/image";

const Faction: NextPage = () => {
  const { data } = trpc.faction.getAll.useQuery();
  const startTime = new Date("4 feb 2023");

  return (
    <div className="pb-10 md:pb-14">
      <h1 className="text-shadow-3d relative overflow-visible py-10 text-center font-serif text-4xl font-black italic tracking-wider sm:text-5xl md:py-14 md:text-9xl">
        Faction Wars
        <Image
          src={"/faction-bg.svg"}
          fill={true}
          style={{ objectFit: "cover", zIndex: -1 }}
          className="max-h-[300px] lg:max-h-[500px]"
          alt="blob bg"
        />
      </h1>
      {/* <p className="mt-10 text-center font-serif text-3xl font-bold">
        Starts in
      </p>
      <Countdown time={startTime} /> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Faction;
