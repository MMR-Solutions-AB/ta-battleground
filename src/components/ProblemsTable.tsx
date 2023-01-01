import React from "react";
import ProblemsTableHeadRow from "./ProblemsTableHeadRow";
import ProblemsTablesRows from "./ProblemsTablesRows";

const ProblemsTable: React.FC = ({}) => {
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
          <ProblemsTablesRows />
        </table>
      </div>
    </div>
  );
};

export default ProblemsTable;
