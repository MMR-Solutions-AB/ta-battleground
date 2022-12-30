import React from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";

const Leaderboard: NextPage = () => {
  const { data } = trpc.leaderboard.getAll.useQuery();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Leaderboard;
