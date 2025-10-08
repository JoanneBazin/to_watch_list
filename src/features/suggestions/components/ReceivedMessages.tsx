"use client";
import { Loader } from "../../../components/ui/Loader";
import { useFetchMessages } from "../hooks/useFetchMessages";
import { MessageCard } from "./MessageCard";

const ReceivedMessages = () => {
  const { messages, isLoading, error } = useFetchMessages();

  return (
    <section>
      <h2 className="sr-only">Messages reçus</h2>
      {isLoading && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isLoading && !error && messages.length < 1 && (
        <p className="my-16 italic text-gray-500 text-center">
          Pas de messages
        </p>
      )}

      {messages.length > 0 && (
        <div>
          {messages.map((message) => (
            <MessageCard message={message} key={message.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReceivedMessages;
