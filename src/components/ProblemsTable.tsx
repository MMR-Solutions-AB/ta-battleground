import React, { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import ProblemsTableRow from "./ProblemsTableRow";
import ProblemsTableHeadRow from "./ProblemsTableHeadRow";
import { useRouter } from "next/router";

const ProblemsTable: React.FC = ({}) => {
  const router = useRouter();
  const { sortBy, order } = router.query;
  const { data: problems, isLoading } = trpc.problem.getAll.useQuery(
    {
      sortBy: Array.isArray(sortBy) ? sortBy[0] : sortBy,
      order: Array.isArray(order) ? order[0] : order,
    },
    {}
  );

  useEffect(() => {
    console.log("rerererendered");
    console.log(router.asPath);
  }, [router]);

  if (isLoading)
    return (
      <div className="flex justify-center py-32">
        <BouncingBalls size="large" />
      </div>
    );

  if ((!problems || problems.length === 0) && !isLoading)
    return <p>hmmm, seems to be an error here</p>;

  return (
    <div className="py-10 text-sm">
      <div className="relative min-w-0 !overflow-y-visible overflow-x-scroll">
        <table className="my-0 min-w-full rounded-md text-xs md:text-sm">
          <thead className="h-9 text-left text-text-dimmed">
            <tr>
              <th className="h-full cursor-pointer px-2 font-semibold text-text-dimmed">
                #
              </th>
              <ProblemsTableHeadRow>Status</ProblemsTableHeadRow>
              <ProblemsTableHeadRow sortBy="name">Namn</ProblemsTableHeadRow>
              <ProblemsTableHeadRow sortBy="difficulty">
                Svårighet
              </ProblemsTableHeadRow>
              <ProblemsTableHeadRow sortBy="submissions">
                Submissions
              </ProblemsTableHeadRow>
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
