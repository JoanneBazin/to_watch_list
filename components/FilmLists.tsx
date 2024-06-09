"use client";
import React from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { DataTable } from "./tables/DataTable";
import { Loader } from "./layout/Loader";
import { useFetchFilms } from "./hooks/useFetchFilms";

export default function FilmList() {
  const typeEntry = "film";
  const { films, loading, error, refetch } = useFetchFilms();

  return (
    <div>
      <div className="flex">
        <AddEntryForm entry={typeEntry} onAdded={refetch} />
      </div>
      <section className="container mx-auto py-10">
        {loading ? (
          <Loader />
        ) : (
          <DataTable data={films} entry={typeEntry} onModify={refetch} />
        )}
      </section>
    </div>
  );
}
