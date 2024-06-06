import Image from "next/image";
import React from "react";

const UserAvatar = () => {
  const userAvatar = "/avatar.svg";
  return <Image src={userAvatar} alt="avatar" width={100} height={100} />;
};

export default UserAvatar;
