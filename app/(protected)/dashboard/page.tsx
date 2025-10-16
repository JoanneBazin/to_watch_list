"use client";

import {
  CategoryFilter,
  FilmsList,
  SeriesList,
} from "@/src/features/media/components";
import { useDashboard } from "@/src/features/media/DashboardContext";

const DashboardPage = () => {
  const { section } = useDashboard();

  return (
    <main>
      <h1 className="sr-only">Tableau de bord</h1>
      {section === "films" && <FilmsList />}
      {section === "series" && <SeriesList />}
      {section === "categories" && <CategoryFilter />}
    </main>
  );
};

export default DashboardPage;
