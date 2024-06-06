"use client";

import { useFetchFilms } from "./hooks/useFetchFilms";
import { useFetchSeries } from "./hooks/useFetchSeries";
import { DataTable } from "./tables/DataTable";

export const Overview = () => {
  const {
    films,
    loading: loadingFilms,
    refetch: refetchFilms,
  } = useFetchFilms();
  const {
    series,
    loading: loadingSeries,
    refetch: refetchSeries,
  } = useFetchSeries();

  return (
    <div className="flex gap-4 items-center m-4">
      <div>
        <h3>Films</h3>
        <DataTable data={films} entry="film" onModify={refetchFilms} />
      </div>
      <div>
        <h3>Séries</h3>
        <DataTable data={series} entry="serie" onModify={refetchSeries} />
      </div>
    </div>
  );
};
