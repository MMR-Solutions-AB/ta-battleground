import React from "react";
import type { RouterOutputs } from "@/utils";
import { GitHub } from "react-feather";
import Image from "next/image";

interface ProfileInfoProps {
  user: NonNullable<RouterOutputs["user"]["getById"]>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const time = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "long",
  });
  return (
    <div className="relative w-56 flex-shrink-0 md:max-w-sm">
      <div className="md:sticky md:top-5">
        <div className="mb-auto">
          <div className="relative mb-2 h-28 w-28 md:h-56 md:w-56">
            <Image
              src={user.image}
              fill={true}
              alt={`${user.name} profile image`}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold">{user.name}</h2>

          <p className="mb-4 text-sm text-text-dimmed">
            {time.format(user.createdAt)}
          </p>
          <a
            href={`https://github.com/${user.github_login}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-text-dimmed hover:underline"
          >
            <GitHub className="h-4 w-4" />
            <p className="">{user.github_login}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
