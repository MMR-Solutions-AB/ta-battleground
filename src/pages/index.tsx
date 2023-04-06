import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { generateScoreForProblem } from "@/utils";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="group relative flex w-full flex-col justify-center px-2 pt-8 text-center sm:py-20 md:px-10 md:py-32">
      <h1 className="mb-5 text-4xl font-black md:mb-8 md:text-8xl">
        Techover
        <br />
        Battleground
      </h1>
      <p className="mb-5 text-text-dimmed max-sm:text-sm 2xl:text-xl">
        Battleground är en plats där du kommer kunna träna på dina Javascript
        kunskaper
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        {sessionData ? (
          <Link
            className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60 max-md:text-sm"
            href="/problems"
          >
            Börja lösa problem!
          </Link>
        ) : (
          <button
            className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
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

export default Home;
