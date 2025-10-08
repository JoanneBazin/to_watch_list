import { FriendProfile } from "@/src/types";
import AddMedia from "../../media/components/AddMedia";
import { useMediaStore } from "../../media/media.store";
import { MediaCard } from "../../media/components/MediaCard";
import { Button, Modal } from "@/src/components/ui";
import { useState } from "react";
import AddEntryForm from "../../media/components/form/AddEntryForm";

const FriendSeriesList = ({ user }: { user: FriendProfile }) => {
  const [open, setOpen] = useState(false);
  const userSeries = user.watchlist.filter((media) => media.type === "SERIE");
  const watchlist = useMediaStore((s) => s.watchlist);

  return (
    <div>
      <div className="flex gap-14 mb-4">
        <h3 className="font-semibold text-2xl">Série</h3>
        <Modal
          trigger={
            <Button variant="outline">Envoyer une suggestion de série</Button>
          }
          title={`série pour ${user.name}`}
          open={open}
          setOpen={setOpen}
        >
          <AddEntryForm
            entry="SERIE"
            isSuggestedMedia={true}
            receiverId={user.id}
            onSuccess={() => setOpen(false)}
          />
        </Modal>
      </div>

      <div>
        {userSeries.length < 1 && (
          <span className="italic text-sm text-zinc-500">
            Aucun titre dans la liste
          </span>
        )}

        {userSeries.length > 0 &&
          userSeries.map((media) => (
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

export default FriendSeriesList;
