import React, { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "react-feather";

interface ProblemsTableHeadRowProps {
  sortBy?: "status" | "name" | "difficulty" | "submissions";
  children: React.ReactNode;
}

const ProblemsTableHeadRow: React.FC<ProblemsTableHeadRowProps> = ({
  children,
  sortBy,
}) => {
  const router = useRouter();
  const utils = trpc.useContext();
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  return (
    <th className="h-full font-normal">
      <div
        className={classNames(
          "flex items-center px-2",
          sortBy && "cursor-pointer"
        )}
        onClick={() => {
          if (!sortBy) return;

          router.push({
            pathname: "/problems",
            query: {
              sortBy,
              order,
            },
          });

          // toggle
          setOrder(order === "asc" ? "desc" : "asc");
          // revalidate query
          utils.problem.getAll.invalidate();
        }}
      >
        {children}
        {sortBy &&
          (order === "desc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          ))}
      </div>
    </th>
  );
};

export default ProblemsTableHeadRow;
