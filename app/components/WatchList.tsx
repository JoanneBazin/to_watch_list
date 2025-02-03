"use client";
import AddEntryForm from "../../components/actions/forms/AddEntryForm";
import { DataTable } from "../../components/tables/DataTable";
import { Loader } from "../../components/layout/Loader";
import { useFetchWatchList } from "../../components/hooks/useFetchWatchList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorieList from "./CategorieList";

export default function WatchList() {
  const { films, series, loading, refetch } = useFetchWatchList();

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
                <AddEntryForm entry="FILM" onAdd={refetch} />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              {loading ? (
                <Loader />
              ) : (
                <DataTable data={films} onModify={refetch} />
              )}
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
                <AddEntryForm entry="SERIE" onAdd={refetch} />
              </DialogContent>
            </Dialog>
            <section className="container mx-auto py-10">
              {loading ? (
                <Loader />
              ) : (
                <DataTable data={series} onModify={refetch} />
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
