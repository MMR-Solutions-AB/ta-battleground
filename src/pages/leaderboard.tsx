import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import Card from "@/components/leaderboard/Card";
import BouncingBalls from "@/components/loaders/BouncingBalls";

const Leaderboard: NextPage = () => {
  const { data: users, isLoading } = trpc.leaderboard.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls />
      </div>
    );

  if (!users)
    return (
      <p className="py-10 text-center">
        Något verkar ha gått fel, var god meddelande Techover Teamet
      </p>
    );

  return (
    <div className="p-10">
      <div className="mx-auto">
        <h2 className="mb-5 text-center text-3xl font-bold italic">
          Top #{users.length}
        </h2>
        <div className="grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user, i) => (
            <Card key={user.id} user={user} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
