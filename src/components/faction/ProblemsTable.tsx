import React from "react";
import type { RouterOutputs } from "@/utils";
import ProblemsTableHeadRow from "@/components/problems/table/ProblemsTableHeadRow";
import { Activity, CheckCircle } from "react-feather";
import Link from "next/link";
import classNames from "classnames";

interface ProblemTableProps {
  problems: NonNullable<RouterOutputs["war"]["getCurrentWar"]>["problems"];
}

const ProblemsTable: React.FC<ProblemTableProps> = ({ problems }) => {
  return (
    <div className="w-full overflow-x-scroll">
      <table className="my-0 w-full rounded-full text-xs sm:mx-0 md:text-sm">
        <thead className="h-9 rounded-md text-left text-text-dimmed">
          <tr>
            <th className="h-full px-2 font-semibold text-text-dimmed">#</th>
            <ProblemsTableHeadRow>Status</ProblemsTableHeadRow>
            <ProblemsTableHeadRow>Namn</ProblemsTableHeadRow>
            <ProblemsTableHeadRow>Svårighet</ProblemsTableHeadRow>
            <ProblemsTableHeadRow>High score</ProblemsTableHeadRow>
            <ProblemsTableHeadRow>Top team</ProblemsTableHeadRow>
          </tr>
        </thead>

        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id} className="h-11 bg-bg-dark even:bg-bg-dimmed">
              <td className="relative h-full">
                <div className="peer flex h-full max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 font-bold text-text-dimmed">
                  {problem.number}
                </div>
              </td>
              <td className="relative h-full">
                <div className="peer flex h-full max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  {!problem.submissions || !problem.submissions[0] ? (
                    ""
                  ) : problem.submissions[0]?.score > 0 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              </td>
              <td className="relative h-full">
                <div className="peer flex h-full max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="overflow-hidden truncate hover:text-primary"
                  >
                    {problem.name}
                  </Link>
                  {problem.tags?.length > 0 && (
                    <div className="ml-3 flex items-center gap-2">
                      {problem.tags.map((tag) => (
                        <div
                          key={tag.id}
                          className={classNames(
                            "rounded-full py-0.5 px-1.5 text-xs",
                            tag.name === "basics"
                              ? "bg-green-600"
                              : tag.name === "numbers"
                              ? "bg-red-600"
                              : tag.name === "objects"
                              ? "bg-amber-600"
                              : tag.name === "functions"
                              ? "bg-pink-500"
                              : tag.name === "strings"
                              ? "bg-blue-600"
                              : tag.name === "arrays"
                              ? "bg-purple-600"
                              : "bg-black"
                          )}
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="relative h-full">
                <div className="peer flex h-full max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  {problem.difficulty === "hard" ? (
                    <span className="text-red-500">Svår</span>
                  ) : problem.difficulty === "medium" ? (
                    <span className="text-amber-500">Medel</span>
                  ) : (
                    <span className="text-green-500">Enkel</span>
                  )}
                </div>
              </td>
              <td className="relative h-full">
                <div className="h-ful peer flex max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  {problem.topSolution &&
                    problem.topSolution.score.toFixed(2) +
                      " - " +
                      `{${problem.topSolution.code.length}}`}
                </div>
              </td>
              <td className="relative h-full">
                <div className="h-ful peer flex max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
                  {problem.topSolution &&
                    problem.topSolution.user.faction?.faction.name}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;
