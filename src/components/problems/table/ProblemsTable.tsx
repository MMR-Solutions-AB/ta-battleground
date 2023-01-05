import React from "react";
import ProblemsTableHeadRow from "./ProblemsTableHeadRow";
import ProblemsTablesRows from "./ProblemsTablesRows";
import TagChips from "./TagChips";

const ProblemsTable: React.FC = ({}) => {
  return (
    <div className="text-sm">
      <div className="relative min-w-0 !overflow-y-visible overflow-x-scroll">
        <TagChips />
        <table className="my-0 mx-5 min-w-full text-xs sm:mx-0 md:text-sm">
          <thead className="h-9 text-left text-text-dimmed">
            <tr>
              <ProblemsTableHeadRow sortBy="number">#</ProblemsTableHeadRow>
              <ProblemsTableHeadRow>Status</ProblemsTableHeadRow>
              <ProblemsTableHeadRow sortBy="name">Namn</ProblemsTableHeadRow>
              <ProblemsTableHeadRow sortBy="difficulty">
                Svårighet
              </ProblemsTableHeadRow>
              <ProblemsTableHeadRow>High score</ProblemsTableHeadRow>
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
