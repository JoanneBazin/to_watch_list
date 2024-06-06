import { getServerSession } from "next-auth";
import React from "react";
import { AuthOptions } from "../api/auth/[...nextauth]/options";
import Error from "../error";
import { User } from "@/components/actions/auth/User";
import { UserProps } from "@/lib/types";

const Account = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <Error />;
  }

  const { id, name, email, avatar }: UserProps = session.user;
  const avatarUrl: string = avatar;

  return (
    <div>
      <div></div>
      <User id={id} name={name} email={email} avatar={avatarUrl} />
    </div>
  );
};

export default Account;
