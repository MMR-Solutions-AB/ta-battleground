import React from "react";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Description from "@/components/problems/Description";
import type { NextPageWithLayout } from "@/pages/_app";
import BouncingBalls from "@/components/loaders/BouncingBalls";

const Problem: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: problem, isLoading } = trpc.problem.getById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <BouncingBalls />
      </div>
    );
  if (!problem) return <p>hmm, error</p>;

  return <Description description={problem.description} />;
};

Problem.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Problem;
