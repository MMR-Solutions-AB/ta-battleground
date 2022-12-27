import React from "react";
import type { RouterOutputs } from "@/utils/trpc";
import Link from "next/link";

interface ProblemsTableRowProps {
  problem: RouterOutputs["problem"]["getAll"][number];
}

const ProblemsTableRow: React.FC<ProblemsTableRowProps> = ({ problem }) => {
  return (
    <tr className="h-11 bg-bg-dark even:bg-bg-dimmed">
      <td className="relative h-full">
        <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
          hej
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
          hej
        </div>
      </td>
    </tr>
  );
};

export default ProblemsTableRow;
