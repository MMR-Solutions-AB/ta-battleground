import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import ProblemsTable from "@/components/ProblemsTable";

const Problems: NextPage = () => {
  const { data } = trpc.problem.getAll.useQuery();

  return (
    <div className="px-40">
      <ProblemsTable />
    </div>
  );
};

export default Problems;
