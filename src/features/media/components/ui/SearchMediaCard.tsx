import { SearchMediaCardProps } from "@/src/types";
import { MediaCover } from "./MediaCover";
import { AddTMDBMediaButton } from "../actions/AddTMDBMediaButton";

export const SearchMediaCard = ({
  media,
  entry,
  isSuggestedMedia = false,
  receiverId,
}: SearchMediaCardProps) => {
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

      <div className="card-details flex flex-col justify-between gap-4">
        <p className="text-sm">{media.overview}</p>
        <div className="self-end">
          <AddTMDBMediaButton
            mediaId={media.id}
            entry={entry}
            isSuggestedMedia={isSuggestedMedia}
            receiverId={receiverId}
          />
        </div>
      </div>
    </div>
  );
};
