import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Description from "@/components/problems/Description";
import Editor from "@/components/problems/Editor";

const Problem: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  const { data: problem, isLoading } = trpc.problem.getById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading) return <p>loading...</p>;
  if (!problem) return <p>hmm, error</p>;

  return (
    <div className="flex h-[calc(100vh-56px)] gap-2 overflow-hidden bg-bg-dark">
      <div className="flex flex-1 flex-col bg-bg-dimmed">
        <div className="flex flex-shrink-0 bg-bg-dark pt-2 text-sm text-text-dimmed">
          <div className="rounded-t-md bg-bg-dimmed py-2 px-4 text-white">
            Description
          </div>
          <div className="rounded-t-md py-2 px-4">Submissions</div>
        </div>
        <div className="h-full overflow-scroll">
          <Description description={problem.description} />
        </div>
      </div>
      {/* <div className="w-4 bg-black"></div> */}
      <div className="flex flex-1 flex-col bg-bg-dimmed">
        <div className="flex flex-shrink-0 bg-bg-dark pt-2 text-sm text-text-dimmed">
          <div className="rounded-t-md bg-bg-dimmed py-2 px-4 text-white">
            Description
          </div>
          <div className="rounded-t-md py-2 px-4">Submissions</div>
        </div>
        <div className="h-full overflow-y-scroll">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Problem;
