import { FriendProfile } from "@/src/types";
import AddMedia from "../../media/components/AddMedia";
import { useMediaStore } from "../../media/media.store";
import { MediaCard } from "../../media/components/MediaCard";
import { Button, Modal } from "@/src/components/ui";
import { useState } from "react";
import AddEntryForm from "../../media/components/form/AddEntryForm";

const FriendFilmsList = ({ user }: { user: FriendProfile }) => {
  const [open, setOpen] = useState(false);
  const userFilms = user.watchlist.filter((media) => media.type === "FILM");
  const watchlist = useMediaStore((s) => s.watchlist);

  return (
    <div>
      <div className="flex gap-14 mb-4">
        <h3 className="font-semibold text-2xl">Films</h3>
        <Modal
          trigger={
            <Button variant="outline">Envoyer une suggestion de film</Button>
          }
          title={`Film pour ${user.name}`}
          open={open}
          setOpen={setOpen}
        >
          <AddEntryForm
            entry="FILM"
            isSuggestedMedia={true}
            receiverId={user.id}
            onSuccess={() => setOpen(false)}
          />
        </Modal>
      </div>

      <div>
        {userFilms.length < 1 && (
          <span className="italic text-sm text-zinc-500">
            Aucun titre dans la liste
          </span>
        )}

        {userFilms.length > 0 &&
          userFilms.map((media) => (
            <MediaCard key={media.id} media={media}>
              {!watchlist.find((item) => item.id === media.id) && (
                <AddMedia mediaId={media.id} />
              )}
            </MediaCard>
          ))}
      </div>
    </div>
  );
};

export default FriendFilmsList;
