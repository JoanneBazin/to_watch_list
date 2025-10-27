import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui";
import { SuggestionResponse } from "./SuggestionResponse";
import { MediaItem } from "@/src/types";

export const SuggestionCard = ({ media }: { media: MediaItem }) => {
  return (
    <Card
      key={media.id}
      className="border-accent-dark p-4 sm:p-6 h-fit"
      data-testid="suggestion-card"
    >
      <CardHeader className="p-0 mb-2">
        <CardTitle className="flex justify-between gap-4 items-start text-base sm:text-xl">
          <div>
            <p>{media.title}</p>
            <p className="text-xs sm:text-sm text-accent">
              {media.originalTitle}
            </p>
          </div>

          <Badge className="bg-foreground">{media.type}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-sm md:text-base">
            {media.real && <p className="font-semibold">{media.real}</p>}
            <p className="text-secondary-foreground">
              {media.categories.join(" | ")}
            </p>
            {media.year && <p className="text-xs">{media.year}</p>}
            {media.synopsis && (
              <p className="text-gray-500 my-1">{media.synopsis}</p>
            )}
            {media.platform && (
              <p className="italic">Disponible sur {media.platform}</p>
            )}
          </div>

          {media.suggestions && (
            <div>
              <div className="md:hidden w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-4 sm:my-6"></div>
              <p className="text-xs lg:text-sm">envoyé par</p>
              {media.suggestions.map((s) => (
                <div
                  key={s.id}
                  className="flex md:flex-col gap-6 md:gap-3 items-start my-4"
                >
                  <div className="flex gap-3">
                    <Avatar size="small" img={s.sender.image} />
                    <p> {s.sender.name}</p>
                  </div>
                  {s.senderComment && (
                    <div className="w-full flex md:justify-end pt-1">
                      <p className="italic text-sm lg:text-base">
                        {s.senderComment}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <SuggestionResponse mediaId={media.id} />
      </CardContent>
    </Card>
  );
};
