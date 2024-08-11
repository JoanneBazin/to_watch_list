import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  size?: "small" | "medium" | "large";
  img: string | null;
}

export const Avatar = ({ size = "medium", img }: AvatarProps) => {
  let sizeAvatar: string;

  switch (size) {
    case "small":
      sizeAvatar = "w-[24px] h-[24px]";
      break;
    case "medium":
      sizeAvatar = "w-[34px] h-[34px]";
      break;
    case "large":
      sizeAvatar = "w-[100px] h-[100px]";
      break;
  }

  return (
    <div className={clsx(sizeAvatar, "bg-zinc-600 rounded-full relative")}>
      <Image
        src={img || "/avatar.svg"}
        alt="user avatar"
        fill
        className="rounded-full object-cover object-center"
        onError={(e) => {
          e.currentTarget.src = "/avatar.svg";
        }}
      />
    </div>
  );
};
