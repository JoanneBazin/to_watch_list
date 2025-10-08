import { Contact } from "@/src/types";

export const FriendContactList = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <>
      {contacts.length < 1 && (
        <p className="ml-12 italic text-gray-500">Pas de contact</p>
      )}

      <ul>
        {contacts.length > 0 &&
          contacts.map((friend) => (
            <li key={friend.id} className="py-1">
              {friend.name}
            </li>
          ))}
      </ul>
    </>
  );
};
