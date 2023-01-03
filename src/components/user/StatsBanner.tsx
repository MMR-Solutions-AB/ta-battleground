import React from "react";
import type { RouterOutputs } from "@/utils";
import classNames from "classnames";

interface StatsBannerProps {
  user: NonNullable<RouterOutputs["user"]["getById"]>;
}

const StatsBanner: React.FC<StatsBannerProps> = ({ user }) => {
  return (
    <div
      className={classNames(
        "mb-4 grid grid-cols-2 gap-2 rounded-md bg-gradient-to-tr from-secondary to-primary p-8 text-center italic",
        user.batch ? "md:grid-cols-4" : "md:grid-cols-3"
      )}
    >
      <div className="px-3">
        <p className="mb-1">Rank</p>
        <h5 className="text-2xl font-bold md:text-4xl">
          {user.rank + 1} / {user._count.accounts + 1}
        </h5>
      </div>
      <div className="px-3">
        <p className="mb-1">Score</p>
        <h5 className="text-2xl font-bold md:text-4xl">
          {user.score.toFixed(2)}
        </h5>
      </div>
      <div className="px-3">
        <p className="mb-1">Targets</p>
        <h5 className="text-2xl font-bold md:text-4xl">
          {user.submissions.length}
        </h5>
      </div>
      {user.batch && (
        <div className="px-3">
          <p className="mb-1">Batch</p>
          <h5 className="text-2xl font-bold md:text-4xl">{user.batch}</h5>
        </div>
      )}
    </div>
  );
};

export default StatsBanner;
