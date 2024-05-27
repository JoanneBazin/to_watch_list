"use client";
import { Item } from "@/lib/types";
import React, { useEffect, useState } from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";

export default function SerieList({
  initialSeries,
}: {
  initialSeries: Item[];
}) {
  const [series, setSeries] = useState(initialSeries);
  const typeEntry = "serie";
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSeries = async () => {
    const response = await fetch("/api/series");
    const data = await response.json();
    setSeries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div>
      <div>
        <AddEntryForm entry={typeEntry} onAdded={fetchSeries} />
      </div>
      <section className="container mx-auto py-10">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <DataTable columns={columns} data={series} />
        )}
      </section>
    </div>
  );
}
