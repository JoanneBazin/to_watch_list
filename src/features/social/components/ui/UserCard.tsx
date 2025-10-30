"use client";
import React from "react";
import Link from "next/link";
import { SearchContact } from "@/src/types";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui";
import { ValidateFriendRequest } from "../actions/ValidateFriendRequest";
import { SendFriendRequest } from "../actions/SendFriendRequest";

export const UserCard = ({ user }: { user: SearchContact }) => {
  let actionSection;

  switch (user.friendshipStatus) {
    case "friends":
      actionSection = (
        <Button variant="ghost" className="text-xs md:text-sm">
          <Link href={`/user/${user.id}`}>Voir le profil</Link>
        </Button>
      );
      break;
    case "pending_sent":
      actionSection = (
        <ValidateFriendRequest senderId={user.id} requestId={user.requestId} />
      );
      break;
    case "pending_received":
      actionSection = (
        <span className="text-sm italic text-accent">Demande en attente</span>
      );
      break;
    case "none":
    default:
      actionSection = <SendFriendRequest receiverId={user.id} />;
  }

  return (
    <Card
      className="flex flex-col items-center border-accent-dark"
      data-testid="user-card"
    >
      <CardHeader>
        <CardTitle className="text-center">{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar img={user.image} size="large" />
      </CardContent>
      <CardFooter className="flex justify-center">{actionSection}</CardFooter>
    </Card>
  );
};
