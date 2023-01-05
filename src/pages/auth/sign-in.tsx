import React from "react";
import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { GitHub } from "react-feather";
import Image from "next/image";

const SignIn: NextPage<any> = ({ providers }) => {
  return (
    <div className="flex h-[calc(100vh-56px)] items-center justify-center px-4 py-10 md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-3 text-4xl font-bold md:text-6xl">
          Sign in to Battleground
        </h2>
        <p className="mb-8 text-text-dimmed">
          Battleground är en plats där du kommer kunna träna på dina Javascript
          kunskaper
        </p>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              className="mx-auto flex items-center gap-2 rounded bg-white py-3 px-6 tracking-wider text-black md:text-xl"
              onClick={() => signIn(provider.id, { callbackUrl: "/problems" })}
            >
              <GitHub /> Sign in with {provider.name}
            </button>
          </div>
        ))}
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

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
