"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserProps } from "@/src/lib/types";
import { Button } from "./button";
import Link from "next/link";
import { useFetchRequests } from "../../features/social/hooks/useFetchRequests";
import SendRequest from "../../features/social/components/SendRequest";
import { Loader2 } from "lucide-react";
import ValidateRequest from "../../features/social/components/ValidateRequest";
import { Avatar } from "./Avatar";
import { useUserStore } from "@/src/features/user/user.store";

const UserCard = ({ name, id, image }: UserProps) => {
  const contacts = useUserStore((s) => s.contacts);
  const { sentRequests, receivedRequests, loading } = useFetchRequests();

  const userFriend = contacts.find((contact) => contact.id === id);

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
        {image ? (
          <Avatar img={`data:image/*;base64,${image}`} />
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

export { UserCard };
