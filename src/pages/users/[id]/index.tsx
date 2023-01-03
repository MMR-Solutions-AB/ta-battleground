import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import { useRouter } from "next/router";
import ProfileInfo from "@/components/user/ProfileInfo";
import SubmissionsTable from "@/components/user/SubmissionsTable";
import StatsBanner from "@/components/user/StatsBanner";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import { signIn, signOut, useSession } from "next-auth/react";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, isLoading } = trpc.user.getById.useQuery({
    id: Array.isArray(id) ? id[0] || "" : id ? id : "",
  });
  const { data: sessionData } = useSession();

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls size="xl" />
      </div>
    );

  if (!user) return <div>404</div>;

  return (
    <div className="p-5 md:py-20">
      <div className="mx-auto max-w-7xl md:flex">
        <ProfileInfo user={user} />
        <div className="mt-5 ml-3 flex-1 md:mt-0">
          <StatsBanner user={user} />
          {user.submissions.length === 0 ? (
            <h3 className="text-2xl font-semibold">
              Verkar som att {user.name} inte har hunnit spela än
            </h3>
          ) : (
            <>
              <SubmissionsTable submissions={user.submissions} />
              {user.id === sessionData?.user?.id}
              <div className="mt-10 rounded-md bg-red-100 p-4">
                <h2 className="mb-2 text-2xl font-semibold text-red-600">
                  Danger zone
                </h2>
                <button
                  className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white no-underline transition hover:opacity-80"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
