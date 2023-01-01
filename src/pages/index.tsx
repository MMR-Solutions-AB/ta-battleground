import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <div className="relative w-full py-20 px-10 text-center md:py-32">
        <h1 className="mb-5 text-6xl font-black md:mb-8 md:text-8xl">
          Techover
          <br />
          Battleground
        </h1>
        <p className="mb-5 text-text-dimmed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam,
          laudantium?
        </p>
        {sessionData ? (
          <div className="flex justify-center gap-3">
            <Link
              className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60"
              href="/problems"
            >
              Start solving problems
            </Link>
            <button
              className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="rounded-full bg-bg-dimmed px-10 py-3 font-semibold text-white no-underline transition hover:bg-bg-dimmed/60"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}

        <Image
          src={"/bg-blob.svg"}
          fill={true}
          style={{ objectFit: "cover", zIndex: -1 }}
          alt="blob bg"
        />
      </div>
    </div>
  );
};

export default Home;
