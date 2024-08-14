import { Item } from "@/lib/types";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";

import SendResponseComment from "../actions/suggestions/SendResponseComment";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";

interface RowProps {
  row: Item;
}
const MediaHoverCard = ({ row }: RowProps) => {
  const suggestions = row.suggestions;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex gap-8">
          <p className="font-bold my-2">{row.title}</p>
          <Badge variant="outline">{row.categoryName}</Badge>
        </DialogTitle>
      </DialogHeader>

      <div className="flex gap-4 justify-between">
        <div>
          {row.real ? <p className="font-semibold">{row.real}</p> : null}
          {row.year ? <p className="text-xs">{row.year}</p> : null}
          {row.synopsis ? (
            <p className="text-gray-500">{row.synopsis}</p>
          ) : null}
          {row.platform ? (
            <p className="italic">Disponible sur {row.platform}</p>
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
                  {suggest.receiverComment ? (
                    <p className="text-xs text-zinc-600">Réponse envoyée !</p>
                  ) : (
                    <SendResponseComment suggestId={suggest.id} />
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

export default MediaHoverCard;
