"use client";
import { Loader } from "../../../components/ui/Loader";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";
import { useFetchMessages } from "../../suggestions/hooks/useFetchMessages";

const ReceivedMessages = () => {
  const { messages, isLoading, error } = useFetchMessages();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : messages.length > 0 ? (
        <div>
          {messages.map((message) => (
            <div key={message.id} className="p-2 border-b-2">
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
          ))}
        </div>
      ) : (
        <p>
          <em>Pas de messages</em>
        </p>
      )}
    </div>
  );
};

export default ReceivedMessages;
