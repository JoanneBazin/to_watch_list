"use client";
import { useMemo, useState } from "react";

import { MediaTable } from "@/src/features/media/components/MediaTable";
import {
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui";
import { useMediaStore } from "../media.store";

const CategoryFilter = () => {
  const watchlist = useMediaStore((s) => s.watchlist);

  const categories = useMemo(() => {
    return Array.from(new Set(watchlist.map((media) => media.categoryName)));
  }, [watchlist]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mediasSelection = useMemo(() => {
    if (!selectedCategory) return watchlist;
    return watchlist.filter((media) => media.categoryName === selectedCategory);
  }, [selectedCategory, watchlist]);

  return (
    <div className="flex flex-col gap-8 my-10 mx-auto w-[80vw]">
      <Select
        onValueChange={(value) =>
          setSelectedCategory(value === "ALL" ? null : value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Filtrer par catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <ScrollArea className="max-h-60 rounded-md ">
              <SelectItem value="ALL">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem value={category} key={category}>
                  {category}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="w-full">
        {mediasSelection.length > 0 ? (
          <MediaTable data={mediasSelection} />
        ) : (
          <p>Pas de titres disponibles</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
