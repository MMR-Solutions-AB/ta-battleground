import React from "react";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import type { NextPageWithLayout } from "@/pages/_app";

const Leaderboard: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: problem, isLoading } = trpc.problem.getLeaderboard.useQuery({
    id: router.query.id as string,
  });

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <BouncingBalls />
      </div>
    );
  if (!problem) return <p>hmm, error</p>;

  return (
    <>
      <pre>{JSON.stringify(problem, null, 2)}</pre>;
    </>
  );
};

Leaderboard.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Leaderboard;
