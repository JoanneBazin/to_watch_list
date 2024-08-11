"use client";

import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FriendsProps, Item } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface SendSuggestProps {
  friendId: FriendsProps["id"];
  rowId: Item["id"];
}

const SendSuggestion = ({ friendId, rowId }: SendSuggestProps) => {
  const [isSuggestion, setIsSuggestion] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  const [senderComment, setSenderComment] = useState<string>("");

  useEffect(() => {
    const fetchSentSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/suggestions/share/${rowId}/user/${friendId}`
        );

        if (!response.ok) {
          throw new Error("HTTP error");
        }

        const result = await response.json();
        setIsSuggestion(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSentSuggestions();
  }, [rowId, friendId]);

  const handleSendSuggestion = async () => {
    try {
      const response = await fetch(
        `/api/suggestions/share/${rowId}/user/${friendId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: senderComment }),
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const result = await response.json();
      setIsSuggestion(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader2 />
      ) : isSuggestion ? null : (
        <div>
          <Textarea
            onChange={(e) => setSenderComment(e.target.value)}
            name="comment"
            placeholder="Laisser un commentaire ?"
          />

          <Button
            className="mt-2"
            onClick={handleSendSuggestion}
            variant="outline"
          >
            <CiCirclePlus className="text-lg mr-2" />
            Envoyer ce titre
          </Button>
        </div>
      )}
    </>
  );
};

export default SendSuggestion;
