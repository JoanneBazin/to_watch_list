"use client";
import { Button } from "@/components/ui/button";
import { RiAddLargeLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SuggestionResponseProps {
  suggestId: string;
}

const SuggestionResponse = ({ suggestId }: SuggestionResponseProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptedSuggestion, setAcceptedSuggestion] = useState<boolean>(false);
  const [deletedSuggestion, setDeletedSuggestion] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/suggestions/${suggestId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status: "REFUSED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setDeletedSuggestion(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/suggestions/${suggestId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setAcceptedSuggestion(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2 mx-auto">
      {loading ? (
        <Loader2 />
      ) : deletedSuggestion ? (
        <span className="italic ml-10">Suggestion ignorée</span>
      ) : acceptedSuggestion ? (
        <span className="italic ml-10">Suggestion ajoutée</span>
      ) : (
        <div className="flex flex-col gap-6 mt-4 justify-center">
          <Button variant="outline" onClick={() => handleAdd()}>
            <RiAddLargeLine />
            <span className="ml-2"> Ajouter à ma watch-list</span>
          </Button>
          <Button variant="outline" onClick={() => handleDelete()}>
            <AiOutlineClose />
            <span className="ml-2"> Supprimer la suggestion</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuggestionResponse;
