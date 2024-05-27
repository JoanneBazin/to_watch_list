import Image from "next/image";
import React from "react";
import trash from "../../public/trash.svg";

const DeleteLogo = () => {
  return <Image priority className="size-4" src={trash} alt="delete" />;
};

export default DeleteLogo;
