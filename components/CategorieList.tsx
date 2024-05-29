"use client";
import AddCategory from "./actions/forms/AddCategory";
import { Card, CardTitle } from "./ui/card";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { Loader } from "./layout/Loader";
import { CategoryProps, Item } from "@/lib/types";
import { useState } from "react";

export default function CategorieList() {
  const { categories, loading, error, refetch } = useFetchCategories();
  const [selection, setSelection] = useState<{
    Films: Item[];
    Series: Item[];
  } | null>();

  const handleSelection = async (category: CategoryProps) => {
    console.log(category);

    try {
      const response = await fetch(`/api/category/${category.id}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const result = await response.json();

      setSelection(result);
      console.log(selection);
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
        <div>
          <ul>
            {selection
              ? selection.Films.map((film, index) => (
                  <li key={index}>{film.title}</li>
                ))
              : null}
          </ul>
          <ul>
            {selection
              ? selection.Series.map((serie, index) => (
                  <li key={index}>{serie.title}</li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
