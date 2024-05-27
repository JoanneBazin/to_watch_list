"use client";
import React from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { DataTable } from "./tables/DataTable";
import { useFetchSeries } from "./hooks/useFetchSeries";
import { Loader } from "./layout/Loader";

export default function SerieList() {
  const typeEntry = "serie";
  const { series, loading, error, refetch } = useFetchSeries();

  return (
    <div>
      <div>
        <AddEntryForm entry={typeEntry} onAdded={refetch} />
      </div>
      <section className="container mx-auto py-10">
        {loading ? (
          <Loader />
        ) : (
          <DataTable data={series} onModify={refetch} entry={typeEntry} />
        )}
      </section>
    </div>
  );
}
