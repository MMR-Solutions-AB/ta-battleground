import React from "react";
import ProblemsTableHeadRow from "./ProblemsTableHeadRow";
import ProblemsTablesRows from "./ProblemsTablesRows";
import { useRouter } from "next/router";

const ProblemsTable: React.FC = ({}) => {
  const router = useRouter();
  const { tags } = router.query;

  return (
    <div className="py-10 text-sm">
      <div className="relative mx-auto min-w-0 max-w-6xl !overflow-y-visible overflow-x-scroll sm:px-5">
        <div className="bg-red-500 py-5">{JSON.stringify(tags)}</div>
        <table className="my-0 mx-5 min-w-full text-xs sm:mx-0 md:text-sm">
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
          <ProblemsTablesRows />
        </table>
      </div>
    </div>
  );
};

export default ProblemsTable;
