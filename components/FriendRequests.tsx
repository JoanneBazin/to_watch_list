"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { getSession } from "next-auth/react";
import { UserProps } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";

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

  const validateRequest = async (requestId: number, status: string) => {
    try {
      const response = await fetch(`/api/social/respond/${requestId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status: status }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept invitation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {requests.map((request) => (
        <Card className="my-4" key={request.id}>
          <CardContent className=" grid grid-cols-2 m-2 p-2 items-center gap-4">
            <div className="flex gap-4 items-center">
              <Image
                src={request.sender.avatar}
                alt="avatar"
                height={40}
                width={40}
              />
              <h5>{request.sender.name}</h5>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => validateRequest(request.id, "ACCEPTED")}>
                Ajouter
              </Button>
              <Button onClick={() => validateRequest(request.id, "REJECTED")}>
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FriendRequests;
