import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = ({}) => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  return (
    <div className="flex items-center justify-between gap-2 bg-bg-dimmed px-4 py-2 md:px-10 md:py-3">
      <Link href="/" className="text-2xl font-black tracking-wider">
        Techover Battleground
      </Link>

      <div className="flex items-center gap-4 text-sm text-text-dimmed">
        <Link
          target="_blank"
          href=" https://techover-css-battles-leaderboard.vercel.app/"
          className="hover:text-white"
        >
          Css Battles
        </Link>
        <Link href="/leaderboard" className="hover:text-white">
          Leaderboard
        </Link>
        <Link href="/problems" className="hover:text-white">
          Problems
        </Link>
        {user && user.image && (
          <Link
            href="/me"
            className="group ml-5 flex items-center gap-2 md:ml-14"
          >
            <p className="text-sm group-hover:text-white">{user.name}</p>
            <div className="relative h-8 w-8">
              <Image
                alt={`${user.image} profile image`}
                src={user.image || ""}
                fill={true}
                className="rounded-full"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
