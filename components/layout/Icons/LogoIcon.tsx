import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.svg";

const LogoIcon = () => {
  return <Image priority src={logo} alt="logo" />;
};

export default LogoIcon;
