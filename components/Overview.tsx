"use client";

import { useFetchWatchList } from "./hooks/useFetchWatchList";

import { DataTable } from "./tables/DataTable";

export const Overview = () => {
  const { films, series, loading, refetch } = useFetchWatchList();

  return (
    <div className="flex gap-4 items-center m-4">
      <div>
        <h3>Films</h3>
        <DataTable data={films} onModify={refetch} />
      </div>
      <div>
        <h3>Séries</h3>
        <DataTable data={series} onModify={refetch} />
      </div>
    </div>
  );
};
