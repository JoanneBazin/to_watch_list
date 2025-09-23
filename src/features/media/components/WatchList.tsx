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
import { useFetchWatchList } from "../../../hooks/queries/useFetchWatchList";

import { MediaTable } from "@/src/features/media/components/MediaTable";
import { useMediaStore } from "@/src/stores/mediaStore";
import CategorieList from "@/components/features/watchlist/CategorieList";
import AddEntryForm from "@/src/features/media/components/AddEntryForm";

export default function WatchList() {
  const { isLoading, error } = useFetchWatchList();
  const films = useMediaStore((s) => s.films);
  const series = useMediaStore((s) => s.series);

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
                <AddEntryForm entry="FILM" />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              {isLoading ? <Loader /> : <MediaTable data={films} type="FILM" />}
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
                <AddEntryForm entry="SERIE" />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              {isLoading ? (
                <Loader />
              ) : (
                <MediaTable data={series} type="SERIE" />
              )}
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
