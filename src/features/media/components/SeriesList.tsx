import { useMemo, useState } from "react";
import { useMediaStore } from "../media.store";
import { Button, Modal, Skeleton } from "@/src/components/ui";
import { AddEntryForm } from "./form/AddEntryForm";
import { MediaTable } from "./MediaTable";

export const SeriesList = () => {
  const [open, setOpen] = useState(false);
  const { watchlist, isPending, error } = useMediaStore();
  const series = useMemo(
    () => watchlist.filter((media) => media.type === "SERIE"),
    [watchlist]
  );

  return (
    <section>
      <h2 className="sr-only">Section séries</h2>
      <Modal
        trigger={<Button variant="outline">Ajouter une série</Button>}
        title="Nouvelle série"
        open={open}
        setOpen={setOpen}
      >
        <AddEntryForm
          entry="SERIE"
          isSuggestedMedia={false}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
      {isPending && (
        <Skeleton className="h-48 w-full mt-10 border border-r-radius" />
      )}
      {error && <p>{error}</p>}

      {!isPending && !error && <MediaTable data={series} />}
    </section>
  );
};
