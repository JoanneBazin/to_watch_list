"use client";

import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FriendsProps, Item } from "@/lib/types";

interface SendSuggestProps {
  friendId: FriendsProps["id"];
  rowId: Item["id"];
  entry: string;
}

const SendSuggestion = ({ friendId, rowId, entry }: SendSuggestProps) => {
  const [sentSuggestion, setSentSuggestion] = useState<boolean>(false);

  const handleSendSuggestion = async () => {
    const reqData = {
      receiverId: friendId,
      mediaId: rowId,
    };

    try {
      const response = await fetch(`/api/suggestions/${entry}s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const result = await response.json();
      setSentSuggestion(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {sentSuggestion ? (
        <Button variant="outline">
          <FaCheck />
        </Button>
      ) : (
        <Button onClick={() => handleSendSuggestion()} variant="outline">
          <CiCirclePlus className="text-lg mr-2" />
          Envoyer ce titre
        </Button>
      )}
    </>
  );
};

export default SendSuggestion;
