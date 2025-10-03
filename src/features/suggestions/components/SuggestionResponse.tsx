"use client";
import { Button } from "@/src/components/ui";
import { RiAddLargeLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUpdateSuggestionStatus } from "../hooks/useSuggestionsMutations";
import { SuggestionsStatus } from "@/src/types";

const SuggestionResponse = ({ mediaId }: { mediaId: string }) => {
  const [acceptedSuggestion, setAcceptedSuggestion] = useState<boolean>(false);
  const [deletedSuggestion, setDeletedSuggestion] = useState<boolean>(false);
  const { updateSuggestion, isUpdating, updateError } =
    useUpdateSuggestionStatus();

  const handleUpdateSuggestion = async (status: SuggestionsStatus) => {
    await updateSuggestion(mediaId, status);
    if (!updateError) {
      if (status === "ACCEPTED") {
        setAcceptedSuggestion(true);
      } else {
        setDeletedSuggestion(true);
      }
    }
  };

  return (
    <div className="my-2 mx-auto">
      {isUpdating ? (
        <Loader2 />
      ) : deletedSuggestion ? (
        <span className="italic ml-10">Suggestion ignorée</span>
      ) : acceptedSuggestion ? (
        <span className="italic ml-10">Suggestion ajoutée</span>
      ) : (
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
      )}
    </div>
  );
};

export default SuggestionResponse;
