import { FriendWatchlistProps } from "@/src/types";
import { useMediaStore } from "../../../media/media.store";
import { Button, Modal } from "@/src/components/ui";
import { useState } from "react";
import { Send } from "lucide-react";
import {
  AddEntryForm,
  AddExistantMediaButton,
  MediaCard,
  MediaModalNav,
  SearchMediaForm,
} from "../../../media/components";

const VIEWS = [
  { id: "search", label: "Chercher un titre" },
  { id: "create", label: "Créer un titre" },
];

export const FriendWatchlist = ({ user, entry }: FriendWatchlistProps) => {
  const [open, setOpen] = useState(false);
  const userList = user.watchlist.filter((media) => media.type === entry);
  const watchlist = useMediaStore((s) => s.watchlist);
  const [view, setView] = useState("search");

  return (
    <div>
      <div className="flex items-center gap-14 mb-4">
        <h4 className="font-semibold text-xl sm:text-2xl">
          {entry === "FILM" ? "Films" : "Séries"}
        </h4>
        <Modal
          trigger={
            <Button
              variant="outline"
              className="border-background sm:border-accent"
              aria-label={`Envoyer une suggestion de ${entry}`}
              data-testid={`create-${entry}-suggestion`}
            >
              <Send size={16} />
            </Button>
          }
          title={`${entry === "FILM" ? "Film" : "Série"} pour ${user.name}`}
          open={open}
          setOpen={setOpen}
        >
          <MediaModalNav views={VIEWS} activeView={view} setView={setView} />
          {view === "search" ? (
            <SearchMediaForm
              entry={entry}
              isSuggestedMedia={true}
              receiverId={user.id}
            />
          ) : (
            <AddEntryForm
              entry={entry}
              isSuggestedMedia={true}
              receiverId={user.id}
              onSuccess={() => setOpen(false)}
            />
          )}
        </Modal>
      </div>

      <div className="flex flex-col gap-2">
        {userList.length < 1 && (
          <span className="info-message text-xs sm:text-sm">
            Aucun titre dans la liste
          </span>
        )}

        {userList.length > 0 &&
          userList.map((media) => (
            <MediaCard key={media.id} media={media}>
              {!watchlist.find((item) => item.id === media.id) && (
                <AddExistantMediaButton mediaId={media.id} />
              )}
            </MediaCard>
          ))}
      </div>
    </div>
  );
};
