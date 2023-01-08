import React from "react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { GitHub } from "react-feather";
import Image from "next/image";

const SignIn: NextPage = ({}) => {
  return (
    <div className="flex h-[calc(100vh-56px)] items-center justify-center px-4 py-10 md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative mx-auto mb-4 h-20 w-20 md:h-36 md:w-36">
          <Image
            src={"/logo-icon.png"}
            fill={true}
            style={{ objectFit: "contain" }}
            alt="blob bg"
          />
        </div>
        <h2 className="mb-3 text-4xl font-bold md:text-6xl">
          Sign in to Battleground
        </h2>
        <p className="mb-8 text-text-dimmed 2xl:text-xl">
          Battleground är en plats där du kommer kunna träna på dina Javascript
          kunskaper
        </p>
        <div>
          <button
            className="mx-auto flex items-center gap-2 rounded bg-white py-3 px-6 tracking-wider text-black transition-opacity hover:opacity-60 md:text-xl"
            onClick={() => signIn("github", { callbackUrl: "/me" })}
          >
            <GitHub /> Sign in with github
          </button>
        </div>
      </div>
      <Image
        src={"/bg-blob.svg"}
        fill={true}
        style={{ objectFit: "cover", zIndex: -1 }}
        alt="blob bg"
      />
    </div>
  );
};

export default SignIn;
