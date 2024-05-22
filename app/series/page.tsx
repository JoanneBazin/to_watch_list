import SerieList from "@/components/SerieList";
import { CategoryProps, Item } from "@/lib/types";
import React from "react";

async function fetchSeries(): Promise<Item[]> {
  const response = await fetch("http://localhost:3000/api/series");

  if (!response.ok) {
    throw new Error(`HTTP error ! ${response.status}`);
  }
  return response.json();
}

async function fetchCategories(): Promise<CategoryProps[]> {
  const response = await fetch("http://localhost:3000/api/category");

  if (!response.ok) {
    throw new Error(`HTTP error ! ${response.status}`);
  }
  return response.json();
}

const SeriesPage = async () => {
  const series: Item[] = await fetchSeries();
  const categories: CategoryProps[] = await fetchCategories();

  return (
    <section>
      <SerieList initialSeries={series} />
    </section>
  );
};

export default SeriesPage;
