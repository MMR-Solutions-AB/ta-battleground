import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Problem: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: problem, isLoading } = trpc.problem.getById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading) return <p>loading...</p>;
  if (!problem) return <p>hmm, error</p>;

  return <div className="bg-blue-600">hje</div>;
};

Problem.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Problem;
