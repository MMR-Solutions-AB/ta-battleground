import React, { useState } from "react";
import { trpc } from "@/utils";
import ProfileInfo from "@/components/user/ProfileInfo";
import SubmissionsTable from "@/components/user/SubmissionsTable";
import StatsBanner from "@/components/user/StatsBanner";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ExternalLink } from "react-feather";
import Head from "next/head";
import SelectBatch from "./SelectBatch";
import FactionBanner from "./FactionBanner";

interface UsersPageProps {
  userId: string;
}

const UserPage: React.FC<UsersPageProps> = ({ userId }) => {
  const { data: user, isLoading } = trpc.user.getById.useQuery({
    id: userId,
  });
  const { data: sessionData } = useSession();
  const isOwnUsersPage = user?.id === sessionData?.user?.id;

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls size="xl" />
      </div>
    );

  if (!user) return <div>404</div>;

  return (
    <div className="p-5 md:py-10 lg:pt-20">
      <Head>
        <title>{user.name} - Battleground</title>
      </Head>
      <div className="mx-auto h-full max-w-7xl lg:flex lg:gap-6">
        <ProfileInfo user={user} />
        <div className="mt-5 flex flex-1 flex-col lg:mt-0">
          <StatsBanner user={user} />
          <FactionBanner faction={user.faction} />
          <SelectBatch user={user} isOwnUsersPage={isOwnUsersPage} />

          {user.submissions.length === 0 ? (
            <div>
              <h3 className="mb-6 text-2xl font-semibold">
                Verkar som att {isOwnUsersPage ? "du" : user.name} inte har
                hunnit spela än
              </h3>
              {isOwnUsersPage && (
                <Link
                  href="/problems"
                  className="-mt-3 flex w-max items-center gap-2 rounded-md bg-primary px-4 py-2 hover:underline"
                >
                  Kör din första uppgift <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="my-6 lg:my-12">
              <h2 className="mb-1 text-2xl font-bold">
                {isOwnUsersPage ? "Du" : user.name} har kört följande{" "}
                {user.submissions.length} uppgifter
              </h2>
              <p className="mb-3 text-sm text-text-dimmed">
                Uppgifterna är sorterade med högst poäng till lägst poäng
              </p>
              <SubmissionsTable submissions={user.submissions} />
            </div>
          )}
          {isOwnUsersPage && (
            <div className="mt-auto ml-auto">
              <button
                className="rounded-md bg-red-600 px-5 py-1.5 text-sm font-semibold text-white no-underline transition hover:opacity-80"
                onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
