import React, { useRef } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import party from "party-js";

interface TestCasesProps {
  code: string;
}

const TestCases: React.FC<TestCasesProps> = ({ code }) => {
  const router = useRouter();
  const { id } = router.query;
  const runCodeMutation = trpc.execute.runCode.useMutation();
  const testButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  if (!id) return <></>;

  return (
    <div className="bg-bg-dark p-2 pl-0">
      <div className="flex-shrink-0 rounded-md bg-bg-dimmed p-4">
        <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
          <button
            disabled={runCodeMutation.isLoading}
            className="rounded-md bg-bg-dark px-4 py-1 hover:opacity-80 disabled:opacity-50"
            onClick={async () => {
              const res = runCodeMutation.mutate({
                problemId: Array.isArray(id) ? id[0] || "" : id,
                code,
                type: "test",
              });
              console.log(res);
            }}
          >
            Run
          </button>
          <button
            ref={submitButtonRef}
            disabled={runCodeMutation.isLoading}
            className="rounded-md bg-primary px-4 py-1 text-white hover:opacity-80 disabled:opacity-50"
            onClick={async () => {
              const res = await runCodeMutation.mutateAsync({
                problemId: Array.isArray(id) ? id[0] || "" : id,
                code,
                type: "submit",
              });
              if (res.correctSolution && submitButtonRef.current) {
                party.confetti(submitButtonRef.current, {
                  count: party.variation.range(70, 90),
                  spread: 30,
                  size: 1.5,
                });
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCases;
