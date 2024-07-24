import { getServerSession } from "next-auth";
import React from "react";
import { AuthOptions } from "../api/auth/[...nextauth]/options";

import { UserProps } from "@/lib/types";
import DeleteProfile from "@/components/actions/profile/DeleteProfile";
import EditProfile from "@/components/actions/profile/EditProfile";

const Account = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <div>No session connected</div>;
  }

  const { id, name, avatar }: UserProps = session.user;

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <span className="text-3xl">Welcome back {name}</span>

      <div>
        <EditProfile userId={id} />
      </div>

      <div>
        <DeleteProfile userId={id} />
      </div>
    </div>
  );
};

export default Account;
