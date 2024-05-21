"use client";
import { CategoryProps, Item } from "@/lib/types";
import React, { useEffect, useState } from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";

export default function SerieList({
  initialSeries,
  categories,
}: {
  initialSeries: Item[];
  categories: CategoryProps[];
}) {
  const [series, setSeries] = useState(initialSeries);
  const typeEntry = "serie";

  const fetchSeries = async () => {
    const response = await fetch("/api/series");
    const data = await response.json();
    setSeries(data);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div>
      <AddEntryForm
        entry={typeEntry}
        categories={categories}
        onAdded={fetchSeries}
      />

      {series.map((item, index) => (
        <div className="bg-foreground text-background m-2 rounded" key={index}>
          {item.title}
        </div>
      ))}
    </div>
  );
}
