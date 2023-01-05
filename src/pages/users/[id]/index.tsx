import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import UserPage from "@/components/user/UsersPage";

const User: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = Array.isArray(id) ? id[0] || "" : id ? id : "";

  return <UserPage userId={userId} />;
};

export default User;
