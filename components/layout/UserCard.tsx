"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserProps } from "@/lib/types";
import { useFetchFriends } from "../hooks/useFetchFriends";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFetchRequests } from "../hooks/useFetchRequests";
import SendRequest from "../actions/social/SendRequest";
import { Loader2 } from "lucide-react";
import ValidateRequest from "../actions/social/ValidateRequest";
import { Avatar } from "./Avatar";

const UserCard = ({ name, id, avatar }: UserProps) => {
  const { friends } = useFetchFriends();
  const { sentRequests, receivedRequests, loading } = useFetchRequests();

  const userFriend = friends.find((friend) => friend.id === id);

  const receiverRequest = sentRequests.find((user) => user.receiver.id === id);

  const senderRequest = receivedRequests.find((user) => user.sender.id === id);

  return (
    <Card
      className="flex flex-col p-2 mx-auto items-center justify-center"
      key={id}
    >
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {avatar ? (
          <Avatar img={`data:image/*;base64,${avatar}`} />
        ) : (
          <Avatar img="/avatar.svg" />
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : userFriend ? (
          <Button variant="outline">
            <Link href={`/communauty/${id}`}>Profil</Link>
          </Button>
        ) : receiverRequest ? (
          <span className="text-sm italic">Demande en attente</span>
        ) : senderRequest ? (
          <ValidateRequest requestId={senderRequest.id} senderId={id} />
        ) : (
          <SendRequest receiverId={id} />
        )}
      </CardFooter>
    </Card>
  );
};

export default UserCard;
