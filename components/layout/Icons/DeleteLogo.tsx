import Image from "next/image";
import React from "react";
import close from "../../../public/close.svg";

const DeleteLogo = () => {
  return <Image priority className="size-4" src={close} alt="delete" />;
};

export default DeleteLogo;
