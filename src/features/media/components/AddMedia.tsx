"use client";

import { Button } from "@/src/components/ui";
import { useState } from "react";
import { useAddMedia } from "../hooks/useWatchlistMutations";
import { handleError } from "@/src/utils/errorHandlers";

interface AddMediaProps {
  mediaId: string;
}

const AddMedia = ({ mediaId }: AddMediaProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addNewUserMedia } = useAddMedia();

  const handleAdd = async () => {
    setError(null);
    try {
      await addNewUserMedia(mediaId);
      setAdded(true);
    } catch (error) {
      handleError(error, setError);
    }
  };

  return (
    <>
      {added ? (
        <span className="italic">Ajouté à ma liste</span>
      ) : (
        <Button onClick={handleAdd} variant="outline" className="px-6 my-4">
          Ajouter à ma watchlist
        </Button>
      )}
    </>
  );
};

export default AddMedia;
