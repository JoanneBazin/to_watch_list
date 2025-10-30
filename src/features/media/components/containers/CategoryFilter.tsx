"use client";
import { useMemo, useState } from "react";
import { useMediaStore } from "../../media.store";
import { MediaTable } from "../ui/MediaTable";

export const CategoryFilter = () => {
  const watchlist = useMediaStore((s) => s.watchlist);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        watchlist
          .flatMap((media) => media.categories.map((cat) => cat.trim()))
          .sort()
      )
    );
  }, [watchlist]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mediasSelection = useMemo(() => {
    if (!selectedCategory) return watchlist;
    return watchlist.filter((media) =>
      media.categories.includes(selectedCategory)
    );
  }, [selectedCategory, watchlist]);

  return (
    <section>
      <h2 className="sr-only">Section tri par catégorie</h2>
      <div className="flex flex-col gap-4 my-4 lg:my-10">
        <select
          id="category-filter"
          className="h-10 sm:w-1/3 cursor-default items-center rounded-lg border border-input bg-background px-1 md:px-3 py-2 text-xs md:text-sm overflow-y-scroll ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onChange={(e) =>
            setSelectedCategory(
              e.target.value === "ALL" ? null : e.target.value
            )
          }
        >
          <option value="ALL">Toutes les catégories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="w-full">
          {mediasSelection.length > 0 ? (
            <MediaTable data={mediasSelection} />
          ) : (
            <p>Pas de titres disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};
