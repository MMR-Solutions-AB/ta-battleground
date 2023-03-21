import React, { useState } from "react";
import classNames from "classnames";
import { type RouterOutputs, trpc } from "@/utils";

interface SelectBatchProps {
  user: NonNullable<RouterOutputs["user"]["getById"]>;
  isOwnUsersPage: boolean;
}

const SelectBatch: React.FC<SelectBatchProps> = ({ user, isOwnUsersPage }) => {
  const [selectedBatch, setSelectedBatch] = useState(user.batch || "");
  const updateBatchMutation = trpc.user.updateBatch.useMutation();
  const utils = trpc.useContext();
  const [batchResponseStatus, setBatchResponseStatus] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  return (
    <>
      {/* Show section to prompt user to select a batch if they dont already have one */}
      {isOwnUsersPage && !user.batch && (
        <div className="mb-3">
          <h2 className="mb-1 text-2xl font-bold">
            Verkar inte som att du har valt vilken batch du gick/går i 😔
          </h2>
          <p className="mb-3 text-sm text-text-dimmed">
            Var snäll och välj vilken batch du gick/går i
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
    </>
  );
};

export default SelectBatch;
