"use client";

import { Button } from "@/src/components/ui";
import { useState } from "react";
import { useAddToWatchlist } from "../hooks/useWatchlistMutations";

interface AddMediaProps {
  mediaId: string;
}

const AddMedia = ({ mediaId }: AddMediaProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const { addMedia, isAddingMedia, addError } = useAddToWatchlist();

  const handleAdd = async () => {
    await addMedia(mediaId);
    setAdded(true);
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
