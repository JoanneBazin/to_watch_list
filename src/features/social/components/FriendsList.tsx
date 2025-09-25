"use client";
import { Avatar } from "@/src/components/ui";
import Link from "next/link";
import { useUserStore } from "../../user/user.store";

const FriendsList = () => {
  const contacts = useUserStore((s) => s.contacts);

  return (
    <div>
      <h2 className="m-6 text-2xl font-semibold">Contacts</h2>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="flex gap-4 items-center m-6">
            <Avatar img={`data:image/*;base64,${contact.image}`} />
            <Link href={`/communauty/${contact.id}`}>{contact.name}</Link>
          </div>
        ))
      ) : (
        <p className="italic m-10">Pas de contacts</p>
      )}
    </div>
  );
};

export default FriendsList;
