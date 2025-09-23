import { Item } from "@/src/lib/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import AddMedia from "../features/watchlist/AddMedia";

interface FriendWatchlistProps {
  medias: Item[];
}

const FriendsWatchlist = ({ medias }: FriendWatchlistProps) => {
  return (
    <ul className="ml-6">
      {medias.length > 0 ? (
        medias.map((media) => (
          <HoverCard key={media.id}>
            <HoverCardTrigger asChild>
              {media.watched ? (
                <li className="my-3 italic text-zinc-500">{media.title}</li>
              ) : (
                <li className="my-3">{media.title}</li>
              )}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <h5 className="font-bold my-1">{media.title}</h5>
                <span className="bg-zinc-700 p-2 rounded absolute right-2 top-2">
                  {media.categoryName}
                </span>
                {media.real ? (
                  <p className="text-sm font-semibold">{media.real}</p>
                ) : null}
                {media.year ? <p className="text-xs">{media.year}</p> : null}
                {media.synopsis ? (
                  <p className="text-gray-500">{media.synopsis}</p>
                ) : null}
                {media.platform ? (
                  <p className="mt-2 italic">Disponible sur {media.platform}</p>
                ) : null}
                <AddMedia mediaId={media.id} />
              </div>
            </HoverCardContent>
          </HoverCard>
        ))
      ) : (
        <span className="italic text-sm text-zinc-500">
          Rien en attente ! 😎
        </span>
      )}
    </ul>
  );
};

export default FriendsWatchlist;
