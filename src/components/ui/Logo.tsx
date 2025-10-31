import clsx from "clsx";
import Image from "next/image";
import { LogoProps } from "@/src/types";

export const Logo = ({ size = "large", img, alt }: LogoProps) => {
  let sizeLogo: string;

  switch (size) {
    case "x-small":
      sizeLogo = "w-[25px] sm:w-[45px] h-auto";
      break;
    case "small":
      sizeLogo = "w-[30px] sm:w-[50px] h-auto";
      break;
    case "medium":
      sizeLogo = "w-[70px] sm:w-[100px] h-auto";
      break;
    case "large":
      sizeLogo = "w-[200px] sm:w-[350px] h-auto";
      break;
  }

  return (
    <div className={clsx(sizeLogo)}>
      <Image
        src={img || "/watchers_logo.svg"}
        alt={alt || "Logo"}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
};
