"use client";

import { Button } from "@/src/components/ui/button";
import { FriendsProps } from "@/src/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ReceiverIdProps {
  receiverId: FriendsProps["id"];
}

const SendRequest = ({ receiverId }: ReceiverIdProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleAddContact = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/social/requests/${receiverId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      setLoading(false);
      setAdded(true);
    } catch (error) {
      console.log(error);
      setAdded(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {added ? (
        <span>
          <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800" />
        </span>
      ) : loading ? (
        <Button>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button onClick={handleAddContact}>Ajouter</Button>
      )}
    </div>
  );
};

export default SendRequest;
