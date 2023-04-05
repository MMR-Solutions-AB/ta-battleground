import React from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Editor from "@/components/problems/Editor";
import Link from "next/link";
import classNames from "classnames";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import Head from "next/head";
import type { ProblemArgument } from "@/data/Problem";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();

  return (
    <Link
      href={`/problems/${router.query.id}${href}`}
      className={classNames(
        "rounded-t-md py-2 px-4",
        router.pathname === `/problems/[id]${href}`
          ? "bg-bg-dimmed text-white"
          : "transition-colors hover:bg-bg-dimmed/50"
      )}
    >
      {children}
    </Link>
  );
};

interface ProblemsLayoutProps {
  children: React.ReactNode;
}

const ProblemsLayout: React.FC<ProblemsLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { data: problem, isLoading } = trpc.problem.getById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls />
      </div>
    );
  if (!problem) return <p>hmm, error</p>;

  return (
    <div className="w-screen grid-cols-[1fr_1fr] gap-2 bg-bg-dark prose-pre:bg-bg-dark lg:grid lg:h-[calc(100vh-56px)]">
      <Head>
        <title>{problem.name} - Battleground</title>
      </Head>
      <div className="flex flex-col lg:h-[calc(100vh-56px)]">
        <div className="flex flex-shrink-0 bg-bg-dark pt-2 text-sm text-text-dimmed">
          <NavLink href="">Description</NavLink>
          <NavLink href="/submissions">Submissions</NavLink>
          <NavLink href="/leaderboard">Leaderboard</NavLink>
        </div>
        <div className="flex-1 overflow-scroll bg-bg-dimmed">{children}</div>
      </div>
      {/* <div className="w-4 bg-black"></div> */}
      <div className="hidden h-[calc(100vh-56px)] w-full flex-col bg-bg-dimmed lg:flex">
        <Editor
          starterCode={problem.submissions[0]?.code}
          problemName={problem.name}
          problemArgs={problem.arguments as ProblemArgument[]}
        />
      </div>

      <div className="px-4 py-14 lg:hidden">
        <h2 className="text-center text-2xl font-bold">
          Varför ser jag inte text editorn?
        </h2>
        <p className="text-center text-text-dimmed">
          Din skärmstorlek är för liten för att editorn ska visas. Din skärm
          måste vavra 1024px eller större
        </p>
      </div>
    </div>
  );
};

export default ProblemsLayout;
