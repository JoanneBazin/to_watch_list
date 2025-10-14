"use client";
import { Button, Loader } from "@/src/components/ui";
import { RiAddLargeLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useUpdateSuggestionStatus } from "../hooks/useSuggestionsMutations";
import { SuggestionsStatus } from "@/src/types";

const SuggestionResponse = ({ mediaId }: { mediaId: string }) => {
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
    return <p className="italic text-center">Suggestion ignorée</p>;
  }
  if (acceptedSuggestion) {
    return <p className="italic text-center">Suggestion ajoutée</p>;
  }

  return (
    <div className="my-2 mx-auto max-w-60">
      {isUpdating ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col gap-6 mt-4 justify-center">
            <Button
              variant="outline"
              onClick={() => handleUpdateSuggestion("ACCEPTED")}
            >
              <RiAddLargeLine />
              <span className="ml-2"> Ajouter à ma watch-list</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleUpdateSuggestion("REFUSED")}
            >
              <AiOutlineClose />
              <span className="ml-2"> Supprimer la suggestion</span>
            </Button>
          </div>
          {updateError && (
            <p className="error-message text-center mt-3">{updateError}</p>
          )}
        </>
      )}
    </div>
  );
};

export default SuggestionResponse;
