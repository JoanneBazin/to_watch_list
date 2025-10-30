"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Loader,
  Textarea,
} from "@/src/components/ui";
import { useState } from "react";
import { useUpdateSuggestionResponse } from "../../hooks";

export const SendResponseComment = ({
  suggestionId,
}: {
  suggestionId: string;
}) => {
  const [receiverComment, setReceiverComment] = useState<string>("");
  const [commentSent, setCommentSent] = useState<boolean>(false);
  const { sendComment, isUpdating, updateError } =
    useUpdateSuggestionResponse();

  const handleSendResponse = async (e: React.MouseEvent) => {
    const result = await sendComment(suggestionId, receiverComment);
    if (result.success) {
      setCommentSent(true);
    }
  };

  if (commentSent) {
    return <p className="text-xs text-zinc-600">Réponse envoyée !</p>;
  }

  return (
    <Accordion type="single">
      <AccordionItem className="w-full" value={suggestionId}>
        <AccordionTrigger>
          <span className="mr-6 text-xs">Renvoyer un commentaire</span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <Textarea
            onChange={(e) => setReceiverComment(e.target.value)}
            name="comment"
            placeholder="Laisser un commentaire ?"
          />
          {updateError && (
            <p className="error-message text-xs my-2">{updateError}</p>
          )}

          <Button
            className="mt-3"
            onClick={handleSendResponse}
            variant="outline"
          >
            {isUpdating ? <Loader size="small" /> : "Envoyer"}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
