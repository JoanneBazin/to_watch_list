"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Textarea,
} from "@/src/components/ui";
import { useState } from "react";
import { useUpdateSuggestionResponse } from "../hooks/useSuggestionsMutations";
import { handleError } from "@/src/utils/errorHandlers";

const SendResponseComment = ({ suggestionId }: { suggestionId: string }) => {
  const [receiverComment, setReceiverComment] = useState<string>("");
  const [commentSent, setCommentSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addResponseComment } = useUpdateSuggestionResponse();

  const handleSendResponse = async () => {
    setError(null);
    try {
      await addResponseComment(suggestionId, receiverComment);
      setCommentSent(true);
    } catch (error) {
      handleError(error, setError);
    }
  };

  return (
    <>
      {commentSent ? (
        <p className="text-xs text-zinc-600">Réponse envoyée !</p>
      ) : (
        <Accordion type="single">
          <AccordionItem className="w-full" value={suggestionId}>
            <AccordionTrigger>
              <span className="mr-6 text-xs">Renvoyer un commentaire</span>
            </AccordionTrigger>
            <AccordionContent>
              <Textarea
                onChange={(e) => setReceiverComment(e.target.value)}
                name="comment"
                placeholder="Laisser un commentaire ?"
              />

              <Button
                className="mt-2"
                onClick={() => handleSendResponse()}
                variant="outline"
              >
                Envoyer
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default SendResponseComment;
