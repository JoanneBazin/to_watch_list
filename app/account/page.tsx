import { getServerSession } from "next-auth";
import React from "react";
import { AuthOptions } from "../api/auth/[...nextauth]/options";

import { UserProps } from "@/lib/types";
import DeleteProfile from "@/components/actions/profile/DeleteProfile";
import EditProfile from "@/components/actions/profile/EditProfile";
import { Avatar } from "@/components/layout/Avatar";

const Account = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <div>No session connected</div>;
  }

  const { id, name, avatar }: UserProps = session.user;
  const userAvatar = URL.createObjectURL(avatar);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <span className="text-3xl">Welcome back {name}</span>
      <Avatar size="large" img={avatar} />

      <div>
        <EditProfile userId={id} userName={name} />
      </div>

      <div>
        <DeleteProfile userId={id} />
      </div>
    </div>
  );
};

export default Account;
