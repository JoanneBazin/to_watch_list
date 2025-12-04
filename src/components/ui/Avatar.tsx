import { AvatarProps } from "@/src/types";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Avatar = ({
  size = "medium",
  img = "/avatar.svg",
  alt = "Avatar de l'utilisateur",
}: AvatarProps) => {
  const [imgSource, setImgSource] = useState(img || "/avatar.svg");

  useEffect(() => {
    setImgSource(img || "/avatar.svg");
  }, [img]);

  let sizeAvatar: string;

  switch (size) {
    case "small":
      sizeAvatar = "w-[30px] h-[30px]";
      break;
    case "medium":
      sizeAvatar = "w-[40px] sm:w-[70px] h-[40px] sm:h-[70px]";
      break;
    case "large":
      sizeAvatar = "w-[100px] sm:w-[150px] h-[100px] sm:h-[150px]";
      break;
  }

  return (
    <div className={clsx(sizeAvatar, "bg-zinc-600 rounded-full")}>
      <Image
        src={imgSource}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
        className="rounded-full object-cover object-center"
        onError={() => setImgSource("/avatar.svg")}
      />
    </div>
  );
};
