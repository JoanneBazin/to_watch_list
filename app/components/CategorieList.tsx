"use client";
import { Loader } from "../../components/layout/Loader";
import { Item } from "@/lib/types";
import { useState } from "react";
import { DataTable } from "../../components/tables/DataTable";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useFetchCategories } from "../../components/hooks/useFetchCategories";
import { useFetchWatchList } from "../../components/hooks/useFetchWatchList";

export default function CategorieList() {
  const { categories } = useFetchCategories();
  const [filmsSelection, setFilmsSelection] = useState<Item[]>();
  const [seriesSelection, setSeriesSelection] = useState<Item[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const { refetch } = useFetchWatchList();

  const handleSelection = async (value: string) => {
    const category = categories.find((category) => category.name === value);

    if (category) {
      setLoading(true);
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
        setFilmsSelection(result.films);
        setSeriesSelection(result.series);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
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
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h1 className="mx-10 text-2xl font-bold">{selectedCategory}</h1>
              <div className="m-4">
                <h3 className="mx-6 my-4 text-lg">Films</h3>
                {filmsSelection && filmsSelection.length > 0 ? (
                  <DataTable data={filmsSelection} onModify={refetch} />
                ) : (
                  <p>Pas de films disponibles 😶</p>
                )}
              </div>
              <div className="m-4">
                <h3 className="mx-6 my-4 text-lg">Séries</h3>
                {seriesSelection && seriesSelection.length > 0 ? (
                  <DataTable data={seriesSelection} onModify={refetch} />
                ) : (
                  <p>Pas de séries disponibles 😶</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
