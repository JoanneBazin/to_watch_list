"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { MediaItem } from "@/src/types";
import { useUpdateMedia } from "@/src/features/media/hooks/useWatchlistMutations";
import { useState } from "react";
import { ApiError } from "@/src/utils/ApiError";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from "@/src/components/ui";

const EditMedia = ({ row }: { row: MediaItem }) => {
  const { handleSubmit, register, setValue } = useForm<MediaItem>();
  const { updateItem } = useUpdateMedia();
  const [error, setError] = useState<string | null>(null);

  setValue("synopsis", row.synopsis);
  setValue("real", row.real);
  setValue("platform", row.platform);

  if (row.year) {
    setValue("year", row.year);
  }

  const onSubmit: SubmitHandler<MediaItem> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
      type: row.type,
    };
    console.log(reqData);

    try {
      await updateItem(row.id, reqData, row.type);
    } catch (error) {
      setError((error as ApiError).message);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="m-2 font-semibold">
          Modifier <span>{row.title}</span>
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="synopsis" className="text-right">
              Synopsis
            </Label>
            <Textarea
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
        </div>
        <DialogFooter>
          <Button type="submit">Modifier</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditMedia;
