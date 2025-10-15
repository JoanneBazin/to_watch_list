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
      {error && <p className="error-message text-center my-10">{error}</p>}
      {!isLoading && !error && messages.length < 1 && (
        <p className="my-10 info-message">Pas de messages</p>
      )}

      {messages.length > 0 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-7 my-4 sm:my-6"
          style={{ gridAutoFlow: "dense" }}
        >
          {messages.map((message) => (
            <MessageCard message={message} key={message.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReceivedMessages;
