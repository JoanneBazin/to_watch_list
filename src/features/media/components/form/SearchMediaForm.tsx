import { Button, Input, Label, Loader } from "@/src/components/ui";
import { useState } from "react";
import {
  useAddSearchedMediaToContactWatchlist,
  useAddSearchedMediaToWatchlist,
  useSearchMedia,
} from "../../hooks";
import { SearchMediaCard } from "../SearchMediaCard";
import { EntryType } from "@/src/types";

export const SearchMediaForm = ({
  entry,
  isSuggestedMedia = false,
  receiverId,
}: {
  entry: EntryType;
  isSuggestedMedia?: boolean;
  receiverId?: string;
}) => {
  const [query, setQuery] = useState("");
  const [addedMedia, setAddedMedia] = useState(false);
  const { mediaResults, isLoading, error, search } = useSearchMedia();
  const { addNewMedia, isAddingMedia, addError } =
    useAddSearchedMediaToWatchlist();
  const { addNewContactMedia, isAddingContactMedia, addContactError } =
    useAddSearchedMediaToContactWatchlist();

  const handleAdd = async (mediaId: number) => {
    let result;
    if (isSuggestedMedia && receiverId) {
      result = await addNewContactMedia(mediaId, receiverId, entry);
    }
    result = await addNewMedia(mediaId, entry);
    if (result.success) {
      setAddedMedia(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(query, entry);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 sm:my-3"
      >
        <Label htmlFor="media-search" />
        <Input
          id="media-search"
          className="w-3/4 sm:w-2/3"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film"
        />
        <Button className="w-fit self-end">
          {isLoading ? <Loader /> : "Rechercher"}
        </Button>
      </form>

      {mediaResults.length > 0 && (
        <div className="my-6">
          {mediaResults.map((media) => (
            <SearchMediaCard key={media.id} media={media} entry={entry}>
              <div className="self-end">
                {addedMedia ? (
                  <p className="info-message">
                    {isSuggestedMedia
                      ? "Suggestion envoyée"
                      : "Ajouté à la liste"}
                  </p>
                ) : (
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleAdd(media.id)}
                  >
                    {isAddingMedia ? (
                      <Loader />
                    ) : isSuggestedMedia ? (
                      "Envoyer comme suggestion"
                    ) : (
                      "Ajouter à ma liste"
                    )}
                  </Button>
                )}
                {addError && <p className="error-message mt-4">{addError}</p>}
              </div>
            </SearchMediaCard>
          ))}
        </div>
      )}
    </div>
  );
};
