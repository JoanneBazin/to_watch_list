"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { FriendsProps } from "@/lib/types";
import { useFetchFriends } from "../hooks/useFetchFriends";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserLinkBtn } from "../actions/social/UserLinkBtn";

import { useSession } from "next-auth/react";

const UserCard = ({ name, id, avatar }: FriendsProps) => {
  const { data: session } = useSession();
  const { friends } = useFetchFriends();
  const userFriend = friends.find((friend) => friend.id === id);

  return (
    <Card className="p-4 mx-auto" key={id}>
      <CardHeader>
        <CardTitle className="text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={avatar} alt="avatar" width={100} height={100} />
      </CardContent>
      <CardFooter className="flex justify-center">
        {userFriend ? (
          <Button variant="outline">
            <Link href={`/communauty/${id}`}>Profil</Link>
          </Button>
        ) : (
          <UserLinkBtn userId={id} selfId={session?.user.id} />
        )}
      </CardFooter>
    </Card>
  );
};

export default UserCard;
