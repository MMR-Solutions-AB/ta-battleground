import { useRouter } from "next/router";
import React from "react";
import type { RouterOutputs } from "@/utils";
import classNames from "classnames";

interface ProblemsTagsProps {
  tags: RouterOutputs["problem"]["getAll"][number]["tags"];
  isWar: boolean;
}

export const ProblemsTags: React.FC<ProblemsTagsProps> = ({ tags, isWar }) => {
  const router = useRouter();

  if (tags.length === 0) return null;
  return (
    <div className="ml-3 flex items-center gap-2">
      {isWar && (
        <div className="rounded-full bg-white py-0.5 px-1.5 text-xs text-black">
          War
        </div>
      )}
      {tags.map((tag) => (
        <div
          key={tag.id}
          onClick={() => {
            router.push({
              query: {
                ...router.query,
                tags: [tag.name],
              },
            });
          }}
          className={classNames(
            "cursor-pointer rounded-full py-0.5 px-1.5 text-xs transition-opacity hover:opacity-50",
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
  );
};
