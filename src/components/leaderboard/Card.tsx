import React from "react";
import type { RouterOutputs } from "@/utils/trpc";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  user: RouterOutputs["leaderboard"]["getAll"][number];
  index: number;
}

const Card: React.FC<CardProps> = ({ user, index }) => {
  return (
    <Link
      href={`/users/${user.id}`}
      className={classNames(
        "flex cursor-pointer flex-col gap-2 rounded-lg p-4 sm:flex-row",
        { "bg-[#424022]": index === 0 },
        { "bg-[#bfbfbf26]": index === 1 },
        { "bg-[#382e25]": index === 2 },
        { "bg-[#121212]": index > 2 }
      )}
      key={user.id}
    >
      <div className="flex gap-2">
        <div
          className={classNames(
            "mr-1 mt-1 flex-shrink-0 text-xl font-black italic text-white",
            { "text-[#ffd700]": index === 0 },
            { "text-[#c0c0c0]": index === 1 },
            { "text-[#cd7f33]": index === 2 }
          )}
        >
          #{index + 1}
        </div>
        <div className="relative h-10 w-10 flex-shrink-0 md:h-12 md:w-12">
          <Image
            src={user.image}
            alt="profile image"
            fill={true}
            className="rounded-full"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">
          {user.name}{" "}
          {user.batch && (
            <span className="text-base text-text-dimmed">
              (batch {user.batch})
            </span>
          )}
        </h2>
        <p className="text-sm text-gray-400">
          {user.score.toFixed(2)} - {`(${user.completedProblems} uppgifter)`}
        </p>
      </div>
    </Link>
  );
};

export default Card;
