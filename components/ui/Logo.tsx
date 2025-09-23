import clsx from "clsx";
import Image from "next/image";
import LogoSVG from "@/public/watchers_logo.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo = ({ size = "large" }: LogoProps) => {
  let sizeLogo: string;

  switch (size) {
    case "small":
      sizeLogo = "w-[50px] h-auto";
      break;
    case "medium":
      sizeLogo = "w-[100px] h-auto";
      break;
    case "large":
      sizeLogo = "w-[350px] h-auto";
      break;
  }

  return (
    <div className={clsx(sizeLogo)}>
      <Image
        src={LogoSVG}
        alt="logo Watchers"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
};
