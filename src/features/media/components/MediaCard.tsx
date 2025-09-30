import { MediaCardProps } from "@/src/types";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Badge,
} from "@/src/components/ui";

const MediaCard = ({ media, children }: MediaCardProps) => {
  return (
    <Dialog key={media.id}>
      <DialogTrigger asChild>
        <div className="cursor-pointer font-bold">{media.title}</div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-8">
            <p className="font-bold my-2">{media.title}</p>
            <Badge variant="outline">{media.categoryName}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 justify-between">
          <div>
            {media.real ? <p className="font-semibold">{media.real}</p> : null}
            {media.year ? <p className="text-xs">{media.year}</p> : null}
            {media.synopsis ? (
              <p className="text-gray-500">{media.synopsis}</p>
            ) : null}
            {media.platform ? (
              <p className="italic">Disponible sur {media.platform}</p>
            ) : null}
          </div>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { MediaCard };
