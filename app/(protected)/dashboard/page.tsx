"use client";

import { useMediaStore } from "@/src/features/media/media.store";
import { useDashboard } from "./layout";
import CategorieList from "@/src/features/media/components/CategorieList";
import { Button, Modal, Skeleton } from "@/src/components/ui";
import AddEntryForm from "@/src/features/media/components/AddEntryForm";
import { MediaTable } from "@/src/features/media/components/MediaTable";
import { useMemo, useState } from "react";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const { section } = useDashboard();
  const { watchlist, isPending, error } = useMediaStore();
  const { films, series } = useMemo(() => {
    const films = [];
    const series = [];

    for (const media of watchlist) {
      if (media.type === "FILM") films.push(media);
      else if (media.type === "SERIE") series.push(media);
    }

    return { films, series };
  }, [watchlist]);

  if (section === "categories") {
    return (
      <section>
        <CategorieList />
      </section>
    );
  }

  if (section === "series") {
    return (
      <section>
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
        <MediaTable data={series} />
      </section>
    );
  }

  return (
    <section>
      <Modal
        trigger={<Button variant="outline">Ajouter un film</Button>}
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

export default DashboardPage;
