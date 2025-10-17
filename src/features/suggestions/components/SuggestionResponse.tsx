"use client";
import { Button, Loader } from "@/src/components/ui";
import { useState } from "react";
import { useUpdateSuggestionStatus } from "../hooks";
import { SuggestionsStatus } from "@/src/types";
import { Plus, X } from "lucide-react";

export const SuggestionResponse = ({ mediaId }: { mediaId: string }) => {
  const [acceptedSuggestion, setAcceptedSuggestion] = useState<boolean>(false);
  const [deletedSuggestion, setDeletedSuggestion] = useState<boolean>(false);
  const { updateSuggestion, isUpdating, updateError } =
    useUpdateSuggestionStatus();

  const handleUpdateSuggestion = async (status: SuggestionsStatus) => {
    const result = await updateSuggestion(mediaId, status);
    if (result.success) {
      if (status === "ACCEPTED") {
        setAcceptedSuggestion(true);
      } else {
        setDeletedSuggestion(true);
      }
    }
  };

  if (deletedSuggestion) {
    return <p className="info-message text-sm">Suggestion ignorée</p>;
  }
  if (acceptedSuggestion) {
    return <p className="info-message text-sm">Suggestion ajoutée</p>;
  }

  return (
    <div className="mx-auto mt-4 max-w-56">
      {isUpdating ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => handleUpdateSuggestion("ACCEPTED")}
              data-testid="accept-suggestion-btn"
            >
              <Plus size={16} />
              <span className="ml-2 text-xs md:text-sm">
                {" "}
                Ajouter à ma watch-list
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleUpdateSuggestion("REFUSED")}
            >
              <X size={16} />
              <span className="ml-2 text-xs md:text-sm">
                {" "}
                Supprimer la suggestion
              </span>
            </Button>
          </div>
          {updateError && (
            <p className="error-message text-center">{updateError}</p>
          )}
        </>
      )}
    </div>
  );
};
