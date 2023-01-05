import React from "react";
import type { NextPage } from "next";
import UserPage from "@/components/user/UsersPage";
import { useSession } from "next-auth/react";

const Me: NextPage = () => {
  const { data: sessionData } = useSession();

  const userId = sessionData?.user?.id || "";

  return <UserPage userId={userId} />;
};

export default Me;
