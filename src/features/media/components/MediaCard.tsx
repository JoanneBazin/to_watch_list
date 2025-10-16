import { MediaCardProps } from "@/src/types";
import { Badge, Modal } from "@/src/components/ui";

export const MediaCard = ({ media, children }: MediaCardProps) => {
  return (
    <Modal
      trigger={
        <div className="cursor-pointer text-xs sm:text-sm sm:font-bold sm:p-2">
          {media.title}
        </div>
      }
      title={media.title}
    >
      <Badge variant="outline" className="absolute right-14 top-6">
        {media.categoryName}
      </Badge>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-1">
          {media.real && <p className="font-semibold">{media.real}</p>}
          {media.year && <p className="text-xs">{media.year}</p>}
          {media.synopsis && <p className="text-gray-500">{media.synopsis}</p>}
          {media.platform && (
            <p className="italic">Disponible sur {media.platform}</p>
          )}
        </div>

        {children}
      </div>
    </Modal>
  );
};
