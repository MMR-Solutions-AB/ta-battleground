import React from "react";
import { trpc } from "@/utils/trpc";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import ProblemsTableRow from "./ProblemsTableRow";
import { useRouter } from "next/router";

const ProblemsTablesRows: React.FC = ({}) => {
  const router = useRouter();
  const { sortBy, order, tags } = router.query;
  const { data: problems, isLoading } = trpc.problem.getAll.useQuery({
    sortBy: Array.isArray(sortBy) ? sortBy[0] : sortBy,
    order: Array.isArray(order) ? order[0] : order,
    tags: tags ? (Array.isArray(tags) ? tags : [tags]) : null,
  });

  console.log(problems && problems[2]?.submissions);

  if (isLoading)
    return (
      <tbody>
        <tr className="h-11 opacity-0">
          <td className="relative h-full">
            <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 font-bold text-text-dimmed">
              12
            </div>
          </td>
          <td className="relative h-full">
            <div className="peer flex h-full min-w-[0rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
              abc
            </div>
          </td>
          <td className="relative h-full">
            <div className="peer flex h-full min-w-[16rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
              abcdefehgid
            </div>
          </td>
          <td className="relative h-full">
            <div className="peer flex h-full min-w-[8rem] max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2 md:min-w-[16rem]">
              Medel
            </div>
          </td>
          <td className="relative h-full">
            <div className="h-ful peer flex max-w-lg items-center overflow-hidden text-ellipsis whitespace-nowrap px-2">
              45
            </div>
          </td>
        </tr>
        <tr className="flex h-40 w-full justify-center pt-10">
          <td>
            <div className="absolute left-1/2 -translate-x-1/2">
              <BouncingBalls size="large" />
            </div>
          </td>
        </tr>
      </tbody>
    );

  if ((!problems || problems.length === 0) && !isLoading)
    return <p>hmmm, seems to be an error here</p>;

  return (
    <tbody className="">
      {problems.map((problem) => (
        <ProblemsTableRow key={problem.id} problem={problem} />
      ))}
    </tbody>
  );
};

export default ProblemsTablesRows;
