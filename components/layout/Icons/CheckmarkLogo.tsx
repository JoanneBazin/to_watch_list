import Image from "next/image";
import React from "react";
import checkmark from "../../../public/check.svg";

const CheckmarkLogo = () => {
  return <Image priority className="size-4" src={checkmark} alt="view" />;
};

export default CheckmarkLogo;
