"use client";
import { useFetchFriends } from "@/src/hooks/queries/useFetchFriends";
import { Avatar } from "@/components/ui/Avatar";
import { Loader } from "@/src/components/ui/Loader";
import Link from "next/link";

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
            <Avatar img={`data:image/*;base64,${friend.avatar}`} />
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
