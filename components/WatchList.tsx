"use client";
import React from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { DataTable } from "./tables/DataTable";
import { Loader } from "./layout/Loader";
import { useFetchWatchList } from "./hooks/useFetchWatchList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
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
                <AddEntryForm entry="FILM" onAdded={refetch} />
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
                <AddEntryForm entry="SERIE" onAdded={refetch} />
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
