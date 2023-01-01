import React from "react";
import type { RouterOutputs } from "@/utils/trpc";
import classNames from "classnames";

interface SubmissionCardProps {
  submission: RouterOutputs["problem"]["getMySubmissions"][number];
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const time = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div className="rounded-md bg-bg-dark p-5">
      <div
        className={classNames(
          "relative mb-5 overflow-y-hidden overflow-x-scroll"
        )}
      >
        <pre className="text-sm">{submission.code}</pre>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-text-dimmed">
        <p>
          {`{ ${submission.code.length} }`} - {submission.score}
        </p>
        <p>{time.format(submission.updatedAt)}</p>
      </div>
    </div>
  );
};

export default SubmissionCard;
