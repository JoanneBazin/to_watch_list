"use client";

import { useFetchRequests } from "@/src/features/social/hooks/useFetchRequests";
import { Loader, Avatar } from "@/src/components/ui";
import ValidateFriendRequest from "./ValidateFriendRequest";

const FriendRequests = () => {
  const { receivedRequests, isLoading, error } = useFetchRequests();

  return (
    <section className="max-w-[768px] mx-auto">
      <h2 className="sr-only">Invitation reçues</h2>

      {isLoading && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isLoading && !error && receivedRequests.length < 1 && (
        <p className="my-10 italic text-accent text-center">
          Pas de demandes en attente
        </p>
      )}

      {receivedRequests.length > 0 && (
        <div className="flex flex-col gap-5 my-6">
          {receivedRequests.map((request, index) => (
            <div
              key={index}
              className="flex justify-between items-start max-w-[300px]"
            >
              <div className="flex gap-3 items-center">
                <Avatar img={request.sender.image} />
                <span className="text-sm sm:text-base">
                  {request.sender.name}
                </span>
              </div>
              <ValidateFriendRequest
                requestId={request.id}
                senderId={request.sender.id}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FriendRequests;
