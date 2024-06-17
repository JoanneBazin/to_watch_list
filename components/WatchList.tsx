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

export default function SerieList() {
  const { films, series, loading, refetch } = useFetchWatchList();

  return (
    <div>
      <div className="flex gap-10 m-4 w-full justify-center">
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
      </div>
      <section className="container mx-auto py-10">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-6">
            <DataTable data={films} onModify={refetch} />
            <DataTable data={series} onModify={refetch} />
          </div>
        )}
      </section>
    </div>
  );
}
