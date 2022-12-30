import React from "react";
import { trpc } from "@/utils/trpc";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ProblemsTableRow from "./ProblemsTableRow";

const ProblemsTable: React.FC = ({}) => {
  const { data: problems, isLoading } = trpc.problem.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!problems || problems.length === 0)
    return <p>hmmm, seems to be an error here</p>;

  return (
    <div className="py-10 text-sm">
      <div className="relative min-w-0 !overflow-y-visible overflow-x-scroll">
        <table className="my-0 min-w-full rounded-md text-xs md:text-sm">
          <thead className="h-9 text-left text-text-dimmed">
            <tr>
              <th className="h-full px-2 font-normal">Status</th>
              <th className="h-full px-2 font-normal">Namn</th>
              <th className="h-full px-2 font-normal">Svårighet</th>
            </tr>
          </thead>
          <tbody className="">
            {problems.map((problem) => (
              <ProblemsTableRow key={problem.id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemsTable;
