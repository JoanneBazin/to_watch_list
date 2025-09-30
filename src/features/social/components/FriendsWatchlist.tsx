import { MediaItem } from "@/src/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui";
import AddMedia from "../../media/components/AddMedia";
import { useMediaStore } from "../../media/media.store";
import { MediaCard } from "../../media/components/MediaCard";

const FriendsWatchlist = ({ medias }: { medias: MediaItem[] }) => {
  const watchlist = useMediaStore((s) => s.watchlist);

  return (
    <ul className="ml-6">
      {medias.length > 0 ? (
        medias.map((media) => (
          <MediaCard key={media.id} media={media}>
            {!watchlist.find((item) => item.id === media.id) && (
              <AddMedia mediaId={media.id} />
            )}
          </MediaCard>
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
