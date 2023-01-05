import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = ({}) => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  return (
    <div className="flex items-center justify-between gap-2 bg-bg-dimmed px-4 py-2 md:px-10 md:py-3">
      <Link href="/" className="text-xl font-black tracking-wider md:text-2xl">
        Techover Battleground
      </Link>
      {user && user.image && (
        <div className="flex items-center gap-4 text-sm text-text-dimmed">
          <Link href="/leaderboard" className="hover:text-white">
            Leaderboard
          </Link>
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/problems" className="hover:text-white">
            Problems
          </Link>
          <Link
            href={`/users/${user.id}`}
            className="group flex items-center gap-2 lg:ml-14"
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
        </div>
      )}
    </div>
  );
};

export default Navbar;
