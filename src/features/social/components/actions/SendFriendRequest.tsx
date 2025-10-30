"use client";

import { Button, Loader } from "@/src/components/ui";
import { useState } from "react";
import { useSendFriendRequest } from "../../hooks";

export const SendFriendRequest = ({ receiverId }: { receiverId: string }) => {
  const [added, setAdded] = useState<boolean>(false);
  const { addFriend, isAddingFriend, addingError } = useSendFriendRequest();

  const handleAddContact = async () => {
    const result = await addFriend(receiverId);

    if (result.success) {
      setAdded(true);
    }
  };

  if (added) {
    return (
      <span className="text-sm italic text-accent">Demande en attente</span>
    );
  }

  if (addingError) {
    return <p className="error-message">{addingError}</p>;
  }

  return (
    <Button variant={"outline"} onClick={handleAddContact}>
      {isAddingFriend ? <Loader size="small" /> : "Ajouter"}
    </Button>
  );
};
