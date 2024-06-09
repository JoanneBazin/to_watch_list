"use client";
import AddCategory from "./actions/forms/AddCategory";
import { Loader } from "./layout/Loader";
import { Item } from "@/lib/types";
import { useState } from "react";
import { DataTable } from "./tables/DataTable";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { ScrollArea } from "./ui/scroll-area";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { useFetchFilms } from "./hooks/useFetchFilms";
import { useFetchSeries } from "./hooks/useFetchSeries";

export default function CategorieList() {
  const { categories, refetch } = useFetchCategories();
  const [selection, setSelection] = useState<{
    Films: Item[];
    Series: Item[];
  } | null>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { refetch: filmsRefetch, loading: loadingFilms } = useFetchFilms();
  const { refetch: seriesRefetch, loading: loadingSeries } = useFetchSeries();

  const handleSelection = async (value: string) => {
    const category = categories.find((category) => category.name === value);

    if (category) {
      try {
        const response = await fetch(`/api/category/${category.id}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to find entry");
        }

        const result = await response.json();

        setSelectedCategory(category.name);
        setSelection(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <AddCategory onAdded={refetch} />

      <div className="flex gap-8 my-10">
        <div className="my-6">
          <Select onValueChange={handleSelection}>
            <SelectTrigger>
              <SelectValue placeholder="Trier par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <ScrollArea className="h-72 rounded-md ">
                  {categories.map((category) => (
                    <SelectItem value={category.name} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          {selection &&
            (loadingFilms || loadingSeries ? (
              <Loader />
            ) : (
              <div>
                <h1 className="mx-10 text-2xl font-bold">{selectedCategory}</h1>
                <div className="m-4">
                  <h3 className="mx-6 my-4 text-lg">Films</h3>
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
                  <h3 className="mx-6 my-4 text-lg">Séries</h3>
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
            ))}
        </div>
      </div>
    </div>
  );
}
