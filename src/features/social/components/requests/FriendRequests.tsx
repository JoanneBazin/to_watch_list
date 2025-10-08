"use client";

import { useFetchRequests } from "@/src/features/social/hooks/useFetchRequests";
import { Loader, Avatar } from "@/src/components/ui";
import ValidateFriendRequest from "./ValidateFriendRequest";

const FriendRequests = () => {
  const { receivedRequests, isLoading, error } = useFetchRequests();

  return (
    <section>
      <h2 className="sr-only">Invitation reçues</h2>

      {isLoading && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isLoading && !error && receivedRequests.length < 1 && (
        <p className="my-16 italic text-gray-500 text-center">
          Pas de demandes en attente
        </p>
      )}

      {receivedRequests.length > 0 &&
        receivedRequests.map((request, index) => (
          <div key={index} className="flex gap-4 items-center my-3">
            <Avatar img={request.sender.image} />
            <span className="mr-20">{request.sender.name}</span>
            <ValidateFriendRequest
              requestId={request.id}
              senderId={request.sender.id}
            />
          </div>
        ))}
    </section>
  );
};

export default FriendRequests;
