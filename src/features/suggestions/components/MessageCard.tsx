import { MessageProps } from "@/src/types";
import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export const MessageCard = ({ message }: { message: MessageProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardSpan = (messageLength: number) => {
    if (messageLength < 80) {
      return "col-span-1";
    }
    if (messageLength < 150) {
      return "col-span-1 sm:col-span-2";
    }
    return "col-span-1 sm:col-span-3 lg:col-span-4";
  };

  return (
    <div
      className={clsx(
        "relative border border-accent-dark bg-gradient-to-br from-background to-accent rounded-3xl flex flex-col justify-center gap-4 transition-all duration-200",
        message.receiverComment && getCardSpan(message.receiverComment.length),
        isHovered && "sm:scale-110 z-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      data-testid="message-card"
    >
      <div
        className={clsx(
          "absolute w-full top-1/2 left 1/2 -translate-y-1/2 flex flex-col items-center gap-5 px-6 transition-all duration-300",
          isHovered ? "opacity-0 scale-0" : "opacity-100 scale-100"
        )}
      >
        <MessageCircle />
        <p className="text-center font-semibold">{message.media.title}</p>
      </div>

      <div
        className={clsx(
          "scale-0 opacity-0 px-4 py-5 sm:p-6 lg:py-8 lg:px-10 transition-all duration-300",
          isHovered && "scale-100 opacity-100"
        )}
      >
        <p className="font-semibold md:text-lg">Re: {message.media.title}</p>
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-4"></div>
        <p className="text-sm md:text-base">{message.receiverComment}</p>
        <p className="text-end font-medium pt-4">{message.receiver.name}</p>
      </div>
    </div>
  );
};
