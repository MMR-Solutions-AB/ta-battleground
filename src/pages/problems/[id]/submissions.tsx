import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import SubmissionCard from "@/components/problems/SubmissionCard";

const Problem: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: submissions, isLoading } =
    trpc.problem.getMySubmissions.useQuery({
      id: router.query.id as string,
    });

  if (isLoading) return <p>loading...</p>;
  if (!submissions) return <p>hmm, error</p>;

  return (
    <div className="space-y-3 px-4 py-6">
      {submissions?.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};

Problem.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Problem;