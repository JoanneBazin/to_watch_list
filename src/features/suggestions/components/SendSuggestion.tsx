"use client";

import { Button, Textarea } from "@/src/components/ui";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MediaItem } from "@/src/types";
import { useCreateSuggestion } from "../hooks/useSuggestionsMutations";

interface SendSuggestProps {
  friendId: string;
  media: MediaItem;
}

const SendSuggestion = ({ friendId, media }: SendSuggestProps) => {
  const [sentSuggestion, setSentSuggestion] = useState<boolean>(false);
  const [senderComment, setSenderComment] = useState("");
  const { shareMedia, isSharing, shareError } = useCreateSuggestion();

  const handleSendSuggestion = async () => {
    await shareMedia(media.id, friendId, senderComment);
    if (!shareError) {
      setSentSuggestion(true);
    }
  };
  return (
    <>
      {isSharing ? (
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
