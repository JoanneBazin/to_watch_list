"use client";

import CategoryFilter from "@/src/features/media/components/CategoryFilter";
import { useDashboard } from "@/src/features/media/DashboardContext";
import { FilmsList } from "@/src/features/media/components/FilmsList";
import { SeriesList } from "@/src/features/media/components/SeriesList";

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
