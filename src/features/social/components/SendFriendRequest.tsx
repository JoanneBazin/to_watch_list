"use client";

import { Button } from "@/src/components/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSendFriendRequest } from "../hooks/useSocialMutations";
import { ApiError } from "@/src/utils/ApiError";

const SendFriendRequest = ({ receiverId }: { receiverId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addNewFriend } = useSendFriendRequest();

  const handleAddContact = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await addNewFriend(receiverId);
      setAdded(true);
    } catch (error) {
      setError((error as ApiError).message);
      setAdded(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {added ? (
        <span>
          <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800" />
        </span>
      ) : isLoading ? (
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
