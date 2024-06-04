"use client";
import AddCategory from "./actions/forms/AddCategory";
import { Card, CardTitle } from "./ui/card";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { Loader } from "./layout/Loader";
import { CategoryProps, Item } from "@/lib/types";
import { useState } from "react";
import { DataTable } from "./tables/DataTable";
import { useFetchFilms } from "./hooks/useFetchFilms";
import { useFetchSeries } from "./hooks/useFetchSeries";

export default function CategorieList() {
  const { categories, loading, refetch } = useFetchCategories();
  const [selection, setSelection] = useState<{
    Films: Item[];
    Series: Item[];
  } | null>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { refetch: filmsRefetch } = useFetchFilms();
  const { refetch: seriesRefetch } = useFetchSeries();

  const handleSelection = async (category: CategoryProps) => {
    try {
      const response = await fetch(`/api/category/${category.id}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const result = await response.json();

      setSelectedCategory(category.name);
      setSelection(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddCategory onAdded={refetch} />
      <div className="flex">
        <div className="grid gap-3 m-4">
          {loading ? (
            <Loader />
          ) : (
            categories.map((category) => (
              <Card
                className="p-4 cursor-pointer"
                onClick={() => handleSelection(category)}
                key={category.id}
              >
                <CardTitle>{category.name}</CardTitle>
              </Card>
            ))
          )}
        </div>
        {selection && (
          <div>
            <h1>{selectedCategory}</h1>
            <div className="m-4">
              <h3>Films</h3>
              {selection.Films.length > 0 ? (
                <DataTable
                  data={selection.Films}
                  entry="film"
                  onModify={filmsRefetch}
                />
              ) : (
                <p>Pas de films disponibles 😶</p>
              )}
            </div>
            <div className="m-4">
              <h3>Séries</h3>
              {selection.Series.length > 0 ? (
                <DataTable
                  data={selection.Series}
                  entry="serie"
                  onModify={seriesRefetch}
                />
              ) : (
                <p>Pas de séries disponibles 😶</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
