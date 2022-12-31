import React from "react";
import type { NextPage } from "next";
import ProblemsTable from "@/components/ProblemsTable";

const Problems: NextPage = () => {
  return (
    <div className="px-40">
      <ProblemsTable />
    </div>
  );
};

export default Problems;
