import { getServerSession } from "next-auth";
import React from "react";
import { AuthOptions } from "../api/auth/[...nextauth]/options";

import { UserProps } from "@/lib/types";

const Account = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <div>No session connected</div>;
  }

  const { id, name, email, avatar }: UserProps = session.user;

  return <div>Welcome back {name}</div>;
};

export default Account;
