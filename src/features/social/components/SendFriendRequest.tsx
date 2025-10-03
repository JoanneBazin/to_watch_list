"use client";

import { Button } from "@/src/components/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSendFriendRequest } from "../hooks/useSocialMutations";

const SendFriendRequest = ({ receiverId }: { receiverId: string }) => {
  const [added, setAdded] = useState<boolean>(false);
  const { addFriend, isAddingFriend, addingError } = useSendFriendRequest();

  const handleAddContact = async () => {
    await addFriend(receiverId);
    setAdded(true);
  };

  return (
    <div>
      {added ? (
        <span>
          <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800" />
        </span>
      ) : isAddingFriend ? (
        <Button>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button onClick={handleAddContact}>Ajouter</Button>
      )}
    </div>
  );
};

export default SendFriendRequest;
