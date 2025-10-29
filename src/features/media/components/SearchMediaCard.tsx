import { SearchMediaCardProps } from "@/src/types";
import { MediaCover } from "./MediaCover";
import { useAddTMDBMedia } from "../hooks";
import { useState } from "react";
import { SendSuggestion } from "../../suggestions/components";
import { Button, Loader } from "@/src/components/ui";

export const SearchMediaCard = ({
  media,
  entry,
  isSuggestedMedia = false,
  receiverId,
}: SearchMediaCardProps) => {
  const { addTMDBMedia, isAddingMedia, addError } = useAddTMDBMedia(
    isSuggestedMedia,
    receiverId
  );
  const [addedMedia, setAddedMedia] = useState(false);

  const handleAdd = async (comment?: string) => {
    const result = await addTMDBMedia(
      media.id,
      entry,
      isSuggestedMedia ? comment : undefined
    );
    if (result.success) {
      setAddedMedia(true);
    }
  };

  return (
    <div className="search-media-card gap-4 mb-10">
      <MediaCover cover={media.poster_path} title={media.title} />
      <div className="card-header pb-4">
        <p className="sm:text-lg font-semibold">{media.title}</p>
        <p className="text-xs sm:text-sm text-accent">{media.original_title}</p>
        <p className="mt-2 text-sm sm:text-base">
          {media.release_date.slice(0, 4)}
        </p>
      </div>

      <div className="card-details flex flex-col gap-4">
        <p className="text-sm">{media.overview}</p>
        <div className="self-end">
          {addedMedia ? (
            <p className="info-message">
              {isSuggestedMedia ? "Suggestion envoyée" : "Ajouté à la liste"}
            </p>
          ) : isSuggestedMedia ? (
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
                onClick={() => handleAdd()}
              >
                {isAddingMedia ? <Loader /> : "Ajouter à ma liste"}
              </Button>
              {addError && <p className="error-message mt-4">{addError}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
