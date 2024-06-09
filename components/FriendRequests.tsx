"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { UserProps } from "@/lib/types";

interface FriendRequest {
  id: number;
  sender: UserProps;
}

const FriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const session = await getSession();
      if (!session) {
        return null;
      }
      const userId = session.user.id;

      const response = await fetch(`/api/social/request/${userId}`);
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  if (requests.length < 1) {
    return <p>Pas de demandes en attente</p>;
  }

  return (
    <div>
      {/* {requests.map((request, index) => (
        <User
          key={index}
          id={String(request.id)}
          name={request.sender.name}
          avatar={request.sender.avatar}
        />
      ))} */}
    </div>
  );
};

export default FriendRequests;
