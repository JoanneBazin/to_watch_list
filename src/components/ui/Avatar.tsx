import { AvatarProps } from "@/src/types";
import clsx from "clsx";
import Image from "next/image";

export const Avatar = ({ size = "medium", img }: AvatarProps) => {
  let sizeAvatar: string;

  switch (size) {
    case "small":
      sizeAvatar = "w-[30px] h-auto";
      break;
    case "medium":
      sizeAvatar = "w-[40px] sm:w-[70px] h-auto";
      break;
    case "large":
      sizeAvatar = "w-[100px] sm:w-[150px] h-auto";
      break;
  }

  return (
    <div className={clsx(sizeAvatar, "bg-zinc-600 rounded-full")}>
      <Image
        src={img || "/avatar.svg"}
        alt="user avatar"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-full object-cover object-center"
      />
    </div>
  );
};
