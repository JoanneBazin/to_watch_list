import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui";
import SuggestionResponse from "./SuggestionResponse";
import { MediaItem } from "@/src/types";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";

export const SuggestionCard = ({ media }: { media: MediaItem }) => {
  return (
    <Card key={media.id}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{media.title}</span>

          <Badge>{media.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            {media.real && <p className="font-semibold">{media.real}</p>}
            <p className=" text-gray-400">{media.categoryName}</p>
            {media.year && <p className="text-xs">{media.year}</p>}
            {media.synopsis && (
              <p className="text-gray-500 my-1">{media.synopsis}</p>
            )}
            {media.platform && (
              <p className="italic">Disponible sur {media.platform}</p>
            )}
          </div>
          {media.suggestions &&
            media.suggestions.map((s) => (
              <div key={s.id} className="my-4">
                <div className="flex gap-3">
                  <Avatar size="small" img={s.sender.image} />
                  <p>envoyé par {s.sender.name}</p>
                </div>
                {s.senderComment && (
                  <div className="flex mt-2">
                    <RiSingleQuotesL />
                    <p className="italic mt-2">{s.senderComment}</p>
                    <RiSingleQuotesR />
                  </div>
                )}
              </div>
            ))}
        </div>

        <SuggestionResponse mediaId={media.id} />
      </CardContent>
    </Card>
  );
};
