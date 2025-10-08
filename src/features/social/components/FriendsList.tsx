"use client";
import { Avatar, Loader } from "@/src/components/ui";
import Link from "next/link";
import { useUserStore } from "../../user/user.store";

const FriendsList = () => {
  const { contacts, isPending, error } = useUserStore();

  return (
    <section>
      <h2 className="sr-only">Liste des contacts</h2>
      {isPending && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isPending && !error && contacts.length < 1 && (
        <p className="italic m-10">Pas de contacts</p>
      )}

      {contacts.length > 0 &&
        contacts.map((contact) => (
          <div key={contact.id} className="flex gap-4 items-center m-6">
            <Avatar img={contact.image} />
            <Link href={`/user/${contact.id}`}>{contact.name}</Link>
          </div>
        ))}
    </section>
  );
};

export default FriendsList;
