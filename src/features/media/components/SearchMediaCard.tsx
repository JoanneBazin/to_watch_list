import { SearchMediaCardProps } from "@/src/types";
import { MediaCover } from "./MediaCover";

export const SearchMediaCard = ({ media, children }: SearchMediaCardProps) => {
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
        {children}
      </div>
    </div>
  );
};
