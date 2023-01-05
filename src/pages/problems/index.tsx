import React from "react";
import type { NextPage } from "next";
import ProblemsTable from "@/components/problems/table/ProblemsTable";
import WrappedLayout from "@/components/layouts/WrappedLayout";

const Problems: NextPage = () => {
  return (
    <WrappedLayout>
      <ProblemsTable />
    </WrappedLayout>
  );
};

export default Problems;
