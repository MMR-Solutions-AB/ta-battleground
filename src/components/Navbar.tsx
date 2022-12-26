import React from "react";
import Link from "next/link";

const Navbar: React.FC = ({}) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-gray-900 px-4 py-2">
      <Link href="/" className="text-2xl font-black tracking-wider">
        Techover Battleground
      </Link>
      <div className="flex gap-2">
        <Link href="/problems" className="">
          Problems
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
