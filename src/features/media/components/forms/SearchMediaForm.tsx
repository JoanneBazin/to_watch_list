import { Button, Input, Label, Loader } from "@/src/components/ui";
import { useState } from "react";
import { useSearchMedia } from "../../hooks";
import { SearchMediaCard } from "../ui/SearchMediaCard";
import { SearchMediaFormProps } from "@/src/types";

export const SearchMediaForm = ({
  entry,
  isSuggestedMedia = false,
  receiverId,
}: SearchMediaFormProps) => {
  const [query, setQuery] = useState("");
  const {
    mediaResults,
    isLoading: searchLoading,
    error: searchError,
    search,
  } = useSearchMedia();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(query, entry);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:my-3"
      >
        <Label htmlFor="media-search" />
        <Input
          id="media-search"
          className="sm:w-2/3"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film"
        />
        <Button className="w-fit self-end" data-testid="search-media-btn">
          {searchLoading ? <Loader size="small" /> : "Rechercher"}
        </Button>
      </form>

      {searchError && <p className="error-message mt-4">{searchError}</p>}
      {mediaResults.length > 0 && (
        <div className="my-6">
          {mediaResults.map((media) => (
            <SearchMediaCard
              key={media.id}
              media={media}
              entry={entry}
              isSuggestedMedia={isSuggestedMedia}
              receiverId={receiverId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
