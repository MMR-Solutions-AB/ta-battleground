import React, { useState } from "react";
import { trpc } from "@/utils";
import ProfileInfo from "@/components/user/ProfileInfo";
import SubmissionsTable from "@/components/user/SubmissionsTable";
import StatsBanner from "@/components/user/StatsBanner";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import { signOut, useSession } from "next-auth/react";
import classNames from "classnames";
import Link from "next/link";
import { ExternalLink } from "react-feather";

interface UsersPageProps {
  userId: string;
}

const UserPage: React.FC<UsersPageProps> = ({ userId }) => {
  const { data: user, isLoading } = trpc.user.getById.useQuery({
    id: userId,
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

              <select
                name="batch-input"
                id="batch-input"
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(Number(e.target.value));
                }}
                className="w-16 rounded-md border-2 border-bg-dimmed bg-bg-dimmed px-2 py-1 outline-none placeholder:text-sm focus:border-primary"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
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
                "mt-3 mb-6 rounded-md p-4",
                batchResponseStatus.type === "error"
                  ? "bg-red-100 text-red-900"
                  : "bg-green-100 text-green-900"
              )}
            >
              {batchResponseStatus.message}
            </div>
          )}

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
