"use client";
import { Item } from "@/lib/types";
import React, { useEffect, useState } from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";

export default function FilmList({ initialFilms }: { initialFilms: Item[] }) {
  const [films, setFilms] = useState(initialFilms);
  const typeEntry = "film";
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    setFilms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <div className="flex">
        <AddEntryForm entry={typeEntry} onAdded={fetchFilms} />
      </div>
      <section className="container mx-auto py-10">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable columns={columns} data={films} />
        )}
      </section>
    </div>
  );
}
