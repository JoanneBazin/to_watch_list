import { AddTMDBMediaButtonProps } from "@/src/types";
import { useAddTMDBMedia } from "../../hooks";
import { useMediaStore } from "../../media.store";
import { useState } from "react";
import { SendSuggestion } from "@/src/features/suggestions/components";
import { Button, Loader } from "@/src/components/ui";

export const AddTMDBMediaButton = ({
  mediaId,
  entry,
  isSuggestedMedia = false,
  receiverId,
}: AddTMDBMediaButtonProps) => {
  const { addTMDBMedia, isAddingMedia, addError } = useAddTMDBMedia(
    isSuggestedMedia,
    receiverId
  );
  const isInWatchlist = useMediaStore((s) =>
    s.watchlist.some((m) => m.tmdbId === mediaId)
  );
  const [addedMedia, setAddedMedia] = useState(
    isSuggestedMedia ? false : isInWatchlist
  );

  const handleAdd = async (comment?: string) => {
    const result = await addTMDBMedia(
      mediaId,
      entry,
      isSuggestedMedia ? comment : undefined
    );
    if (result.success) {
      setAddedMedia(true);
    }
  };

  if (addedMedia) {
    return (
      <p className="info-message">
        {isSuggestedMedia ? "Suggestion envoyée" : "Ajouté à la liste"}
      </p>
    );
  }

  return (
    <>
      {isSuggestedMedia ? (
        <SendSuggestion
          onSubmit={handleAdd}
          isLoading={isAddingMedia}
          error={addError}
        />
      ) : (
        <>
          <Button
            variant="outline"
            className="text-sm"
            data-testid="add-tmdb-btn"
            onClick={() => handleAdd()}
          >
            {isAddingMedia ? <Loader size="small" /> : "Ajouter à ma liste"}
          </Button>
          {addError && <p className="error-message mt-4">{addError}</p>}
        </>
      )}
    </>
  );
};
