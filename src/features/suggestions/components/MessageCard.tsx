import { MessageProps } from "@/src/types";
import { RiSingleQuotesL, RiSingleQuotesR } from "react-icons/ri";

export const MessageCard = ({ message }: { message: MessageProps }) => {
  return (
    <div className="py-6 border-b-2 border-l-2 border-r-radius max-w-60 flex flex-col items-center gap-4">
      <p>
        {message.receiver.name} sur{" "}
        <span>
          <em>{message.media.title}</em>
        </span>
      </p>

      <div className="flex">
        <RiSingleQuotesL />
        {message.receiverComment}
        <RiSingleQuotesR />
      </div>
    </div>
  );
};
