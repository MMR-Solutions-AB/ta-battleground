import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";

const Problems: NextPage = () => {
  const { data } = trpc.problem.getAll.useQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Problems;
