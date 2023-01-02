import React from "react";
import { useRouter } from "next/router";

const ProblemsFilters: React.FC = ({}) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <div className="rounded-md bg-bg-dimmed px-3 py-1">Status</div>
    </div>
  );
};

export default ProblemsFilters;
