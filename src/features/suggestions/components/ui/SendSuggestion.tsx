"use client";

import { Button, Loader, Textarea } from "@/src/components/ui";
import { useState } from "react";
import { SendSuggestionProps } from "@/src/types";

export const SendSuggestion = ({
  onSubmit,
  isLoading,
  error,
}: SendSuggestionProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    await onSubmit(comment);
    setComment("");
  };

  return (
    <div>
      <label htmlFor="comment" className="sr-only">
        Envoyer un commentaire
      </label>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        id="comment"
        value={comment}
        name="comment"
        placeholder="Laisser un commentaire ?"
      />

      <Button
        className="mt-2"
        onClick={handleSubmit}
        variant="outline"
        data-testid="send-btn"
      >
        {isLoading ? (
          <Loader size="small" />
        ) : (
          <>
            <p>Envoyer</p>
          </>
        )}
      </Button>
      {error && <p className="error-message pt-4">{error}</p>}
    </div>
  );
};
