"use client";

import { Button, Loader } from "@/src/components/ui";
import { useAddToWatchlist } from "../hooks";

export const AddMedia = ({ mediaId }: { mediaId: string }) => {
  const { addMedia, isAddingMedia, addError } = useAddToWatchlist();

  const handleAdd = async () => {
    await addMedia(mediaId);
  };

  return (
    <div className="flex justify-between gap-2 items-center">
      {addError && <p className="error-message">{addError}</p>}
      <Button onClick={handleAdd} variant="outline" className="px-6 py-2 my-4">
        {isAddingMedia ? <Loader /> : "Ajouter à ma watchlist"}
      </Button>
    </div>
  );
};
