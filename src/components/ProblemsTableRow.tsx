import React from "react";
import type { RouterOutputs } from "@/utils/trpc";
import Link from "next/link";
import { CheckCircle, Activity } from "react-feather";

interface ProblemsTableRowProps {
  problem: RouterOutputs["problem"]["getAll"][number];
}

const ProblemsTableRow: React.FC<ProblemsTableRowProps> = ({ problem }) => {
  return (
    <tr className="h-11 bg-bg-dark even:bg-bg-dimmed">
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 font-bold text-text-dimmed">
          {problem.number}
        </div>
      </td>
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          {problem.submissions.length == 0 ? (
            ""
          ) : problem.submissions[0]?.status == "completed" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Activity className="h-4 w-4 text-amber-500" />
          )}
        </div>
      </td>
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[16rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          <Link
            href={`/problems/${problem.id}`}
            className="overflow-hidden truncate hover:text-primary"
          >
            {problem.name}
          </Link>
        </div>
      </td>

      <td className="relative h-full">
        <div className="peer flex h-full min-w-[16rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
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
          {problem._count.submissions}
        </div>
      </td>
    </tr>
  );
};

export default ProblemsTableRow;
