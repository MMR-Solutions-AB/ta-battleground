import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import Card from "@/components/leaderboard/Card";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import WrappedLayout from "@/components/layouts/WrappedLayout";

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
    <WrappedLayout>
      <h2 className="mb-5 text-center text-3xl font-bold italic">
        Top #{users.length}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user, i) => (
          <Card key={user.id} user={user} index={i} />
        ))}
      </div>
    </WrappedLayout>
  );
};

export default Leaderboard;
