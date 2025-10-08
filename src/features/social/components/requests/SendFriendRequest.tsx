"use client";

import { Button, Loader } from "@/src/components/ui";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSendFriendRequest } from "../../hooks/useSocialMutations";

const SendFriendRequest = ({ receiverId }: { receiverId: string }) => {
  const [added, setAdded] = useState<boolean>(false);
  const { addFriend, isAddingFriend, addingError } = useSendFriendRequest();

  const handleAddContact = async () => {
    const success = await addFriend(receiverId);

    if (success) {
      setAdded(true);
    }
  };

  if (added) {
    return (
      <span>
        <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800" />
      </span>
    );
  }

  if (addingError) {
    return <p className="error-message">{addingError}</p>;
  }

  return (
    <Button onClick={handleAddContact}>
      {isAddingFriend ? <Loader /> : "Ajouter"}
    </Button>
  );
};

export default SendFriendRequest;
