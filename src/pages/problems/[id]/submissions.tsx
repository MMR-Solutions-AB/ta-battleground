import React from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import SubmissionCard from "@/components/problems/SubmissionCard";
import BouncingBalls from "@/components/loaders/BouncingBalls";

const Problem: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: submissions, isLoading } =
    trpc.problem.getMySubmissions.useQuery({
      id: router.query.id as string,
    });

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <BouncingBalls />
      </div>
    );
  if (!submissions || submissions.length === 0)
    return (
      <p className="p-6 text-xl font-bold">
        Verkar som att du inte har kört denna uppgift tidigare
      </p>
    );

  return (
    <div className="space-y-3 bg-bg-dimmed px-4 py-6">
      {submissions?.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};

Problem.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Problem;
