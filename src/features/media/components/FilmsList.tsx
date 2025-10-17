import { useMemo, useState } from "react";
import { useMediaStore } from "../media.store";
import { Button, Modal, Skeleton } from "@/src/components/ui";
import { AddEntryForm } from "./form/AddEntryForm";
import { MediaTable } from "./MediaTable";

export const FilmsList = () => {
  const [open, setOpen] = useState(false);
  const { watchlist, isPending, error } = useMediaStore();
  const films = useMemo(
    () => watchlist.filter((media) => media.type === "FILM"),
    [watchlist]
  );

  return (
    <section>
      <h2 className="sr-only">Section films</h2>

      <Modal
        trigger={
          <Button
            variant="outline"
            className="text-xs sm:text-sm"
            data-testid="add-film-btn"
          >
            Ajouter un film
          </Button>
        }
        title="Nouveau film"
        open={open}
        setOpen={setOpen}
      >
        <AddEntryForm
          entry="FILM"
          isSuggestedMedia={false}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
      {isPending && (
        <Skeleton className="h-48 w-full mt-10 border border-r-radius" />
      )}
      {error && <p>{error}</p>}

      {!isPending && !error && <MediaTable data={films} />}
    </section>
  );
};
