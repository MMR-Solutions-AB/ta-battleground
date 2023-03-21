import React from "react";
import type { NextPage } from "next";
import { ExternalLink } from "react-feather";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div className="py-10 px-4 text-center md:py-20">
      <div className="font-black">
        <p className="text-5xl italic text-red-500">404</p>
        <h1 className="text-4xl">
          Verkar som att sidan du letar efter inte finns
        </h1>
      </div>

      <Link
        href="/problems"
        className="mx-auto mt-5 flex w-max items-center gap-2 rounded-md bg-primary px-4 py-2 hover:underline"
      >
        Kör uppgifter <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default NotFound;
