"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Textarea,
} from "@/src/components/ui";
import { useState } from "react";

interface SendResponseProps {
  suggestId: string;
}

const SendResponseComment = ({ suggestId }: SendResponseProps) => {
  const [receiverComment, setReceiverComment] = useState<string>("");
  const [commentSent, setCommentSent] = useState<boolean>(false);

  const handleSendResponse = async () => {
    try {
      const response = await fetch(`/api/suggestions/${suggestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverComment: receiverComment,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      setCommentSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {commentSent ? (
        <p className="text-xs text-zinc-600">Réponse envoyée !</p>
      ) : (
        <AccordionItem className="w-full" value={suggestId}>
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
      )}
    </>
  );
};

export default SendResponseComment;
