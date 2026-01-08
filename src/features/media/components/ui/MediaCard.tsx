import { MediaCardProps } from "@/src/types";
import { Badge, Modal } from "@/src/components/ui";
import { EditMediaDialog } from "../actions";

export const MediaCard = ({ media, children }: MediaCardProps) => {
  return (
    <Modal
      trigger={
        <div
          className="cursor-pointer text-xs sm:text-sm sm:font-bold sm:py-1"
          data-testid="media-item"
        >
          {media.title}
        </div>
      }
      title={media.title}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex flex-col gap-1 min-w-[50%]">
          {!media.tmdbId && (
            <div className="absolute -top-12 right-6">
              <EditMediaDialog media={media} />
            </div>
          )}
          {media.originalTitle && (
            <p className="text-xs sm:text-sm lg:text-base text-accent">
              {media.originalTitle}
            </p>
          )}
          {media.real && <p className="font-semibold">{media.real}</p>}
          {media.year && <p className="text-xs">{media.year}</p>}
          {media.synopsis && <p className="text-gray-500">{media.synopsis}</p>}
          {media.platform && (
            <p className="italic">Disponible sur {media.platform}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4 max-w-full">
            {media.categories.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {children}
      </div>
    </Modal>
  );
};
