import React, { useState } from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import Card from "@/components/leaderboard/Card";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import WrappedLayout from "@/components/layouts/WrappedLayout";
import classNames from "classnames";

const Leaderboard: NextPage = () => {
  const { data: users, isLoading } = trpc.leaderboard.getAll.useQuery();
  const batches = [1, 2, 3, 4, 5];
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const filteredUsers = users?.filter((user) =>
    selectedBatch ? user.batch === selectedBatch : true
  );

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
      <div className="mb-3 flex flex-wrap gap-2">
        <div
          className={classNames(
            "cursor-pointer rounded-md bg-bg-dimmed py-1 px-4",
            selectedBatch === null && "bg-primary"
          )}
          onClick={() => setSelectedBatch(null)}
        >
          Alla batches
        </div>
        {batches.map((batch) => (
          <div
            key={batch}
            className={classNames(
              "cursor-pointer rounded-md bg-bg-dimmed py-1 px-4",
              selectedBatch === batch && "bg-primary"
            )}
            onClick={() => setSelectedBatch(batch)}
          >
            Batch {batch}
          </div>
        ))}
      </div>
      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers?.map((user, i) => (
            <Card key={user.id} user={user} index={i} />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl font-bold">
          Verkar som att ingen batch {selectedBatch} elever har kört ännu
        </h2>
      )}
    </WrappedLayout>
  );
};

export default Leaderboard;
