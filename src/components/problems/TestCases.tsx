import React, { useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import party from "party-js";
import type { RouterOutputs } from "@/utils/trpc";
import classNames from "classnames";
import BouncingBalls from "../loaders/BouncingBalls";
interface TestCasesProps {
  code: string;
}

const TestCases: React.FC<TestCasesProps> = ({ code }) => {
  const router = useRouter();
  const { id } = router.query;
  const runCodeMutation = trpc.execute.runCode.useMutation();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [runCodeResponse, setRunCodeResponse] = useState<
    RouterOutputs["execute"]["runCode"] | null
  >(null);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const currentSelectedTestCase =
    runCodeResponse?.ranTestCases[selectedTestCaseIndex];
  const utils = trpc.useContext();

  if (!id) return <></>;

  return (
    <div className="flex-shrink-0 bg-bg-dark p-2 pl-0">
      <div className="flex-shrink-0 rounded-md bg-bg-dimmed p-4">
        <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
          <button
            ref={submitButtonRef}
            disabled={runCodeMutation.isLoading}
            className="rounded-md bg-primary px-4 py-1 text-white hover:opacity-80 disabled:opacity-50"
            onClick={async () => {
              const res = await runCodeMutation.mutateAsync(
                {
                  problemId: Array.isArray(id) ? id[0] || "" : id,
                  code,
                  type: "submit",
                },
                {
                  onSuccess() {
                    utils.problem.getMySubmissions.invalidate();
                    utils.problem.getLeaderboard.invalidate();
                  },
                }
              );

              setRunCodeResponse(res);

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
        {runCodeMutation.isLoading ? (
          <div className="my-4 flex justify-center">
            <BouncingBalls />
          </div>
        ) : (
          runCodeResponse && (
            <div className="-mt-7">
              {runCodeResponse.correctSolution ? (
                <>
                  <h3 className="text-xl font-bold text-green-500 md:text-3xl">
                    Correct
                  </h3>
                  <p className="text-green-500">
                    {runCodeResponse.ranTestCases.length -
                      runCodeResponse.numberOfFailedTestCases}{" "}
                    / {runCodeResponse.ranTestCases.length} testcases passed
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-red-500 md:text-2xl">
                    Fail
                  </h3>
                  <p className="text-sm text-red-500">
                    {runCodeResponse.ranTestCases.length -
                      runCodeResponse.numberOfFailedTestCases}{" "}
                    / {runCodeResponse.ranTestCases.length} testcases passed
                  </p>
                </>
              )}

              <h4 className="my-5 font-black italic md:text-xl">
                Poäng: {runCodeResponse.problemScore.toFixed(2)}{" "}
                <span className="ml-1 text-text-dimmed">{`{ ${runCodeResponse.codeLength} }`}</span>
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {runCodeResponse.ranTestCases.map((testCase, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedTestCaseIndex(i)}
                    className="relative cursor-pointer rounded-md bg-bg-dark px-4 py-1 text-sm tracking-wider transition-opacity hover:opacity-80"
                  >
                    Test #{i + 1}
                    <div
                      className={classNames(
                        "absolute top-0.5 right-0.5 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full",
                        testCase.valid ? "bg-green-500" : "bg-red-500"
                      )}
                    />
                  </div>
                ))}
              </div>
              {currentSelectedTestCase && (
                <div className="prose prose-invert mt-5 prose-pre:mt-1 prose-pre:mb-4">
                  <b>Input</b>
                  <pre>
                    <code className="language-bash">
                      {runCodeResponse.arguments?.map(
                        (arg, i) =>
                          `${arg.name} = ${
                            typeof currentSelectedTestCase.input[i] === "object"
                              ? JSON.stringify(
                                  currentSelectedTestCase.input[i],
                                  null,
                                  2
                                )
                              : currentSelectedTestCase.input[i]
                          }\n`
                      )}
                    </code>
                  </pre>
                  <b>Received output</b>
                  <pre>
                    <code className="language-bash">
                      {currentSelectedTestCase.timedOut
                        ? currentSelectedTestCase.receivedOutput
                          ? currentSelectedTestCase.receivedOutput
                          : "Error: Code timedout\nChecka att du inte har någon loop som körs i oändligheten"
                        : typeof currentSelectedTestCase.receivedOutput ===
                          "object"
                        ? JSON.stringify(
                            currentSelectedTestCase.receivedOutput,
                            null,
                            2
                          )
                        : currentSelectedTestCase.receivedOutput}
                    </code>
                  </pre>
                  {currentSelectedTestCase.timedOut && (
                    <p className="mb-8 text-text-dimmed">
                      Det verkar som att uppgiften time:a ut, alltså att koden
                      aldrig slutade köras. Detta kan ha skett ifall du
                      exempelvis har någon for-loop eller while som aldrig
                      slutar, råkade call:a själva funktion i funktion eller
                      något annat som kan ha fått din kod att köra i all
                      oändlighet
                    </p>
                  )}
                  <b>Expected output</b>
                  <pre>
                    <code className="language-bash">
                      {JSON.stringify(currentSelectedTestCase.output, null, 2)}
                    </code>
                  </pre>

                  {currentSelectedTestCase.debugOutput.length > 0 && (
                    <>
                      <b>Debug output</b>
                      <pre>
                        <code className="language-bash">
                          {currentSelectedTestCase.debugOutput.map((s) => (
                            <p key={s}>{JSON.stringify(s, null, 2)}</p>
                          ))}

                          {/* {JSON.stringify(
                            currentSelectedTestCase.debugOutput,
                            null,
                            2
                          )} */}
                        </code>
                      </pre>
                    </>
                  )}
                </div>
              )}

              {/* <div className="text-sm">
                {JSON.stringify(runCodeResponse, null, 3)}
              </div> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TestCases;
