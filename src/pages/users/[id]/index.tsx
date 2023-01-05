import React, { useState } from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils";
import { useRouter } from "next/router";
import ProfileInfo from "@/components/user/ProfileInfo";
import SubmissionsTable from "@/components/user/SubmissionsTable";
import StatsBanner from "@/components/user/StatsBanner";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import { signOut, useSession } from "next-auth/react";
import classNames from "classnames";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, isLoading } = trpc.user.getById.useQuery({
    id: Array.isArray(id) ? id[0] || "" : id ? id : "",
  });
  const { data: sessionData } = useSession();
  const isOwnUsersPage = user?.id === sessionData?.user?.id;
  const [selectedBatch, setSelectedBatch] = useState(user?.batch || "");
  const updateBatchMutation = trpc.user.updateBatch.useMutation();
  const utils = trpc.useContext();
  const [batchResponseStatus, setBatchResponseStatus] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls size="xl" />
      </div>
    );

  if (!user) return <div>404</div>;

  return (
    <div className="p-5 md:py-10 lg:pt-20">
      <div className="mx-auto h-full max-w-7xl lg:flex lg:gap-6">
        <ProfileInfo user={user} />
        <div className="mt-5 flex flex-1 flex-col lg:mt-0">
          <StatsBanner user={user} />

          {isOwnUsersPage && !user.batch && (
            <div className="mb-3">
              <h2 className="mb-1 text-2xl font-bold">
                Verkar inte som att du har valt vilken batch du går i 😔
              </h2>
              <p className="mb-3 text-sm text-text-dimmed">
                Var snäll och skriv in vilken batch du gick/går i
              </p>
              <input
                type="number"
                name="batch-input"
                id="batch-input"
                min={1}
                max={7}
                placeholder="vilken batch gick/går du i?"
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(
                    Math.max(1, Math.min(7, Number(e.target.value)))
                  );
                }}
                className="w-56 rounded-md border-2 border-bg-dimmed bg-bg-dimmed px-4 py-1 outline-none placeholder:text-sm focus:border-primary"
              />
              <button
                disabled={!selectedBatch || updateBatchMutation.isLoading}
                className="ml-3 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white no-underline transition hover:opacity-80 disabled:opacity-60"
                onClick={async () => {
                  await updateBatchMutation.mutateAsync(
                    {
                      batch: Number(selectedBatch),
                    },
                    {
                      onSettled: () => {
                        utils.user.getById.invalidate();
                        setBatchResponseStatus({
                          type: "success",
                          message: `Tack! Du är nu inskriven som en batch ${selectedBatch} elev`,
                        });
                      },
                      onError: () => {
                        setBatchResponseStatus({
                          type: "error",
                          message: `Oj, verkar som att något gick fel. Var snäll försök igen och ifall problemet skulle kvarstå kontakta Techover om problemet`,
                        });
                      },
                    }
                  );
                }}
              >
                Uppdatera batch
              </button>
            </div>
          )}
          {batchResponseStatus && (
            <div
              className={classNames(
                "mt-3 rounded-md p-4",
                batchResponseStatus.type === "error"
                  ? "bg-red-100 text-red-900"
                  : "bg-green-100 text-green-900"
              )}
            >
              {batchResponseStatus.message}
            </div>
          )}

          {user.submissions.length === 0 ? (
            <h3 className="mb-6 text-2xl font-semibold">
              Verkar som att {user.name} inte har hunnit spela än
            </h3>
          ) : (
            <div className="my-6 lg:my-12">
              <h2 className="mb-1 text-2xl font-bold">
                {isOwnUsersPage ? "Du" : user.name} har kört följande{" "}
                {user.submissions.length} uppgifter
              </h2>
              <p className="mb-3 text-sm text-text-dimmed">
                Uppgifterna är sorterade med högst score till lägst score
              </p>
              <SubmissionsTable submissions={user.submissions} />
            </div>
          )}
          {isOwnUsersPage && (
            <div className="mt-auto">
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
