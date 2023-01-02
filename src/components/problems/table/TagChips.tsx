import React from "react";
import { useRouter } from "next/router";
import { X } from "react-feather";

const TagChips: React.FC = ({}) => {
  const router = useRouter();
  const { tags } = router.query;
  return tags ? (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {(Array.isArray(tags) ? tags : [tags]).map((tag) => (
        <div
          onClick={() => {
            router.push({
              query: {
                ...router.query,
                tags: (Array.isArray(tags) ? tags : [tags]).filter(
                  (t) => t !== tag
                ),
              },
            });
          }}
          key={tag}
          className="flex cursor-pointer items-center gap-1 rounded-full bg-bg-dimmed py-1 pl-3 pr-2 text-sm"
        >
          <p>{tag}</p>
          <div className="rounded-full bg-bg-dark/60 p-0.5">
            <X className="h-3 w-3" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default TagChips;
