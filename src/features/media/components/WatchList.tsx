"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Loader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui";

import { MediaTable } from "@/src/features/media/components/MediaTable";
import CategorieList from "@/src/features/media/components/CategorieList";
import AddEntryForm from "@/src/features/media/components/AddEntryForm";
import { useMediaStore } from "../media.store";

export default function WatchList() {
  const watchlist = useMediaStore((s) => s.watchlist);
  const films = watchlist.filter((media) => media.type === "FILM");
  const series = watchlist.filter((media) => media.type === "SERIE");

  return (
    <div>
      <Tabs defaultValue="films" className=" m-8">
        <TabsList>
          <TabsTrigger value="films">Films</TabsTrigger>
          <TabsTrigger value="series">Séries</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>
        <TabsContent value="films">
          <div className="my-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ajouter un film</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau Film</DialogTitle>
                </DialogHeader>
                <AddEntryForm entry="FILM" isSuggestedMedia={false} />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              <MediaTable data={films} type="FILM" />
            </section>
          </div>
        </TabsContent>

        <TabsContent value="series">
          <div className="my-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ajouter une série</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle Série</DialogTitle>
                </DialogHeader>
                <AddEntryForm entry="SERIE" isSuggestedMedia={false} />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              <MediaTable data={series} type="SERIE" />
            </section>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <CategorieList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
