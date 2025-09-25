import { MediaItem } from "@/src/types";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";
import { DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Badge } from "./badge";
import SendResponseComment from "@/src/features/suggestions/components/SendResponseComment";

const MediaHoverCard = ({ media }: { media: MediaItem }) => {
  const suggestions = media.suggestions;

  return (
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

        <div>
          {suggestions && suggestions.length > 0 ? (
            <div className="flex flex-col">
              Suggestion envoyée par{" "}
              {suggestions.map((suggest) => (
                <div key={suggest.id}>
                  <span className="font-semibold">{suggest.sender.name}</span>
                  <p className="flex my-2">
                    <RiSingleQuotesL />
                    {suggest.senderComment}
                    <RiSingleQuotesR />
                  </p>
                  {!suggest.receiverComment && (
                    <SendResponseComment suggestionId={suggest.id} />
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </DialogContent>
  );
};

export { MediaHoverCard };
