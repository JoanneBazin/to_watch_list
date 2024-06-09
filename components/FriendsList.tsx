"use client";
import { useFetchFriends } from "./hooks/useFetchFriends";
import Image from "next/image";
import Link from "next/link";

const FriendsList = () => {
  const { friends } = useFetchFriends();

  return (
    <div>
      <h2 className="m-6 text-2xl font-semibold">Contacts</h2>
      {friends.map((friend) => (
        <div key={friend.id} className="flex gap-4 items-center">
          <Image src={friend.avatar} alt="avatar" height={40} width={40} />
          <Link href={`/communauty/${friend.id}`}>{friend.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
