"use client";

import { Button, Textarea } from "@/src/components/ui";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MediaItem } from "@/src/types";
import { useCreateSuggestion } from "../hooks/useSuggestionsMutations";
import { ApiError } from "@/src/utils/ApiError";

interface SendSuggestProps {
  friendId: string;
  media: MediaItem;
}

const SendSuggestion = ({ friendId, media }: SendSuggestProps) => {
  const [sentSuggestion, setSentSuggestion] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [senderComment, setSenderComment] = useState("");
  const { sendSuggestion } = useCreateSuggestion();

  const handleSendSuggestion = async () => {
    setIsLoading(true);
    try {
      await sendSuggestion(media.id, friendId, senderComment);
      setSentSuggestion(true);
    } catch (error) {
      setError((error as ApiError).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : sentSuggestion ? (
        <span className="italic">Suggestion envoyée</span>
      ) : (
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
