"use client";

import { Button, Loader, Textarea } from "@/src/components/ui";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { SendSuggestionProps } from "@/src/types";
import { useCreateSuggestion } from "../hooks/useSuggestionsMutations";

const SendSuggestion = ({ contactId, mediaId }: SendSuggestionProps) => {
  const [sentSuggestion, setSentSuggestion] = useState<boolean>(false);
  const [senderComment, setSenderComment] = useState("");
  const { shareMedia, isSharing, shareError } = useCreateSuggestion();

  const handleSendSuggestion = async () => {
    const success = await shareMedia(mediaId, contactId, senderComment);
    if (success) {
      setSentSuggestion(true);
    }
  };

  if (sentSuggestion) {
    return <span className="italic">Suggestion envoyée</span>;
  }
  return (
    <div>
      <Textarea
        onChange={(e) => setSenderComment(e.target.value)}
        name="comment"
        placeholder="Laisser un commentaire ?"
      />

      <Button className="mt-2" onClick={handleSendSuggestion} variant="outline">
        {isSharing ? (
          <Loader />
        ) : (
          <>
            <CiCirclePlus className="text-lg mr-2" />
            <p>Envoyer ce titre</p>
          </>
        )}
      </Button>
      {shareError && <p className="error-message pt-4">{shareError}</p>}
    </div>
  );
};

export default SendSuggestion;
