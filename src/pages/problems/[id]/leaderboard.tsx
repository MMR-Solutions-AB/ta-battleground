import React from "react";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import type { NextPageWithLayout } from "@/pages/_app";
import Image from "next/image";

const Leaderboard: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: submissions, isLoading } = trpc.problem.getLeaderboard.useQuery(
    {
      id: router.query.id as string,
    }
  );

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <BouncingBalls />
      </div>
    );

  if (!submissions || submissions.length === 0)
    return (
      <p className="p-6 text-xl font-bold">
        Verkar som att ingen kör denna uppgift redan, var först med att lösa
        den!
      </p>
    );

  return (
    <div className="p-5">
      <div className="space-y-3">
        {submissions.map((submission, i) => (
          <div
            key={submission.id}
            className="flex items-center gap-4 rounded-md bg-bg-dark p-4 font-semibold md:text-xl"
          >
            <p className="font-black italic">#{i + 1}</p>

            <div className="relative h-7 w-7 md:h-9 md:w-9">
              <Image
                src={submission.user.image}
                alt={`${submission.user.name} profile image`}
                fill={true}
                className="rounded-full"
              />
            </div>
            <p className="flex-1">
              {submission.user.name}{" "}
              {submission.user.batch && (
                <span className="text-base text-text-dimmed">
                  (batch {submission.user.batch})
                </span>
              )}
            </p>
            <p className="text-base text-text-dimmed">
              {submission.score.toFixed(2)}
            </p>
            <p className="text-base text-text-dimmed">
              {`{ ${submission.code.length} }`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

Leaderboard.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Leaderboard;
