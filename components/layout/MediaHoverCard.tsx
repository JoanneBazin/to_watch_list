import { Item } from "@/lib/types";
import { HoverCardContent } from "../ui/hover-card";

interface RowProps {
  row: Item;
}
const MediaHoverCard = ({ row }: RowProps) => {
  const suggestions = row.suggestions;

  return (
    <HoverCardContent className="w-80">
      <h5 className="font-bold my-1">{row.title}</h5>
      {row.real ? <p className="font-semibold">{row.real}</p> : null}
      {row.year ? <p className="text-xs">{row.year}</p> : null}
      {row.synopsis ? <p className="text-gray-500">{row.synopsis}</p> : null}
      {row.platform ? (
        <p className="italic">Disponible sur {row.platform}</p>
      ) : null}
      {suggestions.length > 0 ? (
        <p className="flex flex-col">
          Suggestion envoyée par{" "}
          {suggestions.map((suggest) => (
            <span className="font-semibold" key={suggest.id}>
              {suggest.sender.name} - {suggest.senderComment}
            </span>
          ))}
        </p>
      ) : null}
    </HoverCardContent>
  );
};

export default MediaHoverCard;
