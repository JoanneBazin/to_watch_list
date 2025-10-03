"use client";

import { useFetchRequests } from "@/src/features/social/hooks/useFetchRequests";
import { Loader, Avatar } from "@/src/components/ui";
import ValidateRequest from "./ValidateFriendRequest";

const FriendRequests = () => {
  const { receivedRequests, isLoading, error } = useFetchRequests();
  return (
    <div className="m-4">
      <h2 className="m-6 text-2xl font-semibold">Invitation reçues</h2>

      {isLoading ? (
        <Loader />
      ) : receivedRequests.length > 0 ? (
        receivedRequests.map((request, index) => (
          <div key={index} className="flex gap-4 items-center my-3">
            <Avatar img={request.sender.image} />
            <span className="mr-20">{request.sender.name}</span>
            <ValidateRequest
              requestId={request.id}
              senderId={request.sender.id}
            />
          </div>
        ))
      ) : (
        <p className="mx-10 italic">Pas de demandes en attente</p>
      )}
    </div>
  );
};

export default FriendRequests;
