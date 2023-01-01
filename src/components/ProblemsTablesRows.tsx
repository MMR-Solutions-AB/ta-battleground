import React from "react";
import { trpc } from "@/utils/trpc";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import ProblemsTableRow from "./ProblemsTableRow";
import { useRouter } from "next/router";

const ProblemsTablesRows: React.FC = ({}) => {
  const router = useRouter();
  const { sortBy, order } = router.query;
  const { data: problems, isLoading } = trpc.problem.getAll.useQuery({
    sortBy: Array.isArray(sortBy) ? sortBy[0] : sortBy,
    order: Array.isArray(order) ? order[0] : order,
  });

  if (isLoading)
    return (
      <tbody>
        <tr className="flex h-40 w-full justify-center pt-10">
          <td>
            <div className="absolute left-1/2 -translate-x-1/2">
              <BouncingBalls size="large" />
            </div>
          </td>
        </tr>
      </tbody>
    );

  if ((!problems || problems.length === 0) && !isLoading)
    return <p>hmmm, seems to be an error here</p>;

  return (
    <tbody className="">
      {problems.map((problem) => (
        <ProblemsTableRow key={problem.id} problem={problem} />
      ))}
    </tbody>
  );
};

export default ProblemsTablesRows;
