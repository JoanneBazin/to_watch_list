"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "./button";
import Link from "next/link";
import { Avatar } from "./Avatar";
import { SearchContact } from "@/src/types";
import ValidateFriendRequest from "../../features/social/components/ValidateFriendRequest";
import SendFriendRequest from "@/src/features/social/components/SendFriendRequest";

const UserCard = ({ user }: { user: SearchContact }) => {
  let actionSection;

  switch (user.friendshipStatus) {
    case "friends":
      actionSection = (
        <Button variant="outline">
          <Link href={`/communauty/${user.id}`}>Profil</Link>
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
        <span className="text-sm italic">Demande en attente</span>
      );
      break;
    case "none":
    default:
      actionSection = <SendFriendRequest receiverId={user.id} />;
  }

  return (
    <Card className="flex flex-col p-2 mx-auto items-center justify-center">
      <CardHeader>
        <CardTitle className="text-center">{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {user.image ? (
          <Avatar img={`data:image/*;base64,${user.image}`} />
        ) : (
          <Avatar img="/avatar.svg" />
        )}
      </CardContent>
      <CardFooter className="flex justify-center">{actionSection}</CardFooter>
    </Card>
  );
};

export { UserCard };
