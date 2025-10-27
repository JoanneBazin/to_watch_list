import { useMemo, useState } from "react";
import { useMediaStore } from "../media.store";
import { Button, Modal, Skeleton } from "@/src/components/ui";
import { AddEntryForm } from "./form/AddEntryForm";
import { MediaTable } from "./MediaTable";
import { SearchMediaForm } from "./form/SearchMediaForm";
import { EntryType } from "@/src/types";
import { MediaModalNav } from "./MediaModalNav";

const VIEWS = [
  { id: "search", label: "Chercher un titre" },
  { id: "create", label: "Créer un titre" },
];

export const UserWatchlist = ({ entry }: { entry: EntryType }) => {
  const [open, setOpen] = useState(false);
  const { watchlist, isPending, error } = useMediaStore();
  const mediaList = useMemo(
    () => watchlist.filter((media) => media.type === entry),
    [watchlist, entry]
  );
  const [view, setView] = useState("search");

  return (
    <section>
      <h2 className="sr-only">Section {entry}</h2>

      <Modal
        trigger={
          <Button
            variant="outline"
            className="text-xs sm:text-sm"
            data-testid="add-film-btn"
          >
            {entry === "FILM" ? "Ajouter un film" : "Ajouter une série"}
          </Button>
        }
        title={entry === "FILM" ? "Nouveau film" : "Nouvelle série"}
        open={open}
        setOpen={setOpen}
      >
        <MediaModalNav views={VIEWS} activeView={view} setView={setView} />

        {view === "search" ? (
          <SearchMediaForm entry={entry} />
        ) : (
          <AddEntryForm
            entry={entry}
            isSuggestedMedia={false}
            onSuccess={() => setOpen(false)}
          />
        )}
      </Modal>
      {isPending && (
        <Skeleton className="h-48 w-full mt-10 border border-r-radius" />
      )}
      {error && <p>{error}</p>}

      {!isPending && !error && <MediaTable data={mediaList} />}
    </section>
  );
};
