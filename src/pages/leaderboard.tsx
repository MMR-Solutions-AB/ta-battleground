import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import Card from "@/components/leaderboard/Card";
import BouncingBalls from "@/components/loaders/BouncingBalls";

const Leaderboard: NextPage = () => {
  const { data, isLoading } = trpc.leaderboard.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls />
      </div>
    );

  return (
    <div className="p-10">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.users.map((user, i) => (
          <Card key={user.id} user={user} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
