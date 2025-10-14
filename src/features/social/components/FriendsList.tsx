"use client";
import { Avatar, Loader } from "@/src/components/ui";
import Link from "next/link";
import { useUserStore } from "../../user/user.store";

const FriendsList = () => {
  const { contacts, isPending, error } = useUserStore();

  return (
    <section className="max-w-[768px] mx-auto">
      <h2 className="sr-only">Liste des contacts</h2>
      {isPending && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isPending && !error && contacts.length < 1 && (
        <p className="my-10 italic text-accent text-center">Pas de contacts</p>
      )}

      {contacts.length > 0 && (
        <div className="flex flex-col gap-5 my-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex gap-5 items-center">
              <Avatar img={contact.image} />
              <Link href={`/user/${contact.id}`}>{contact.name}</Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FriendsList;
