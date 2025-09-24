"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useFetchCategories } from "@/src/features/media/hooks/useFetchCategories";
import { EntryType, MediaItem } from "@/src/types";
import { useAddMedia } from "@/src/features/media/hooks/useWatchlistMutations";
import { ApiError } from "@/src/utils/ApiError";
import { Button, DialogFooter, Input, Label } from "@/src/components/ui";

const AddEntryForm = ({ entry }: { entry: EntryType }) => {
  const { handleSubmit, register, reset } = useForm<MediaItem>();
  const { addNewItem } = useAddMedia();
  const [error, setError] = useState<string | null>(null);

  const { categories } = useFetchCategories();

  const onSubmit: SubmitHandler<MediaItem> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
      type: entry,
    };

    try {
      await addNewItem(reqData, entry);

      reset();
    } catch (error) {
      setError((error as ApiError).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Titre
          </Label>
          <Input
            id="title"
            {...register("title")}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="synopsis" className="text-right">
            Synopsis
          </Label>
          <Input
            id="synopsis"
            {...register("synopsis")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="year" className="text-right">
            Année de sortie
          </Label>
          <Input
            type="number"
            id="year"
            {...register("year")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="real" className="text-right">
            Réalisateur
          </Label>
          <Input id="real" {...register("real")} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="platform" className="text-right">
            Plateforme streaming
          </Label>
          <Input
            id="platform"
            {...register("platform")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div></div>
          <select
            id="category"
            {...register("categoryName")}
            required
            className="flex gap-2 h-10 w-full cursor-default items-center rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Catégorie</option>
            {categories &&
              categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Ajouter</Button>
      </DialogFooter>
    </form>
  );
};

export default AddEntryForm;
