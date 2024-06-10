"use client";
import { useFetchFriends } from "./hooks/useFetchFriends";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./layout/Loader";

const FriendsList = () => {
  const { friends, loading } = useFetchFriends();

  return (
    <div>
      <h2 className="m-6 text-2xl font-semibold">Contacts</h2>
      {loading ? (
        <Loader />
      ) : friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.id} className="flex gap-4 items-center m-6">
            <Image src={friend.avatar} alt="avatar" height={40} width={40} />
            <Link href={`/communauty/${friend.id}`}>{friend.name}</Link>
          </div>
        ))
      ) : (
        <p className="italic m-10">Pas de contacts</p>
      )}
    </div>
  );
};

export default FriendsList;