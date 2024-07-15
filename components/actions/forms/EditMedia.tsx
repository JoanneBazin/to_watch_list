"use client";

import { useFetchWatchList } from "@/components/hooks/useFetchWatchList";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Item } from "@/lib/types";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditProps {
  row: Item;
}

const EditMedia = ({ row }: EditProps) => {
  const { handleSubmit, register } = useForm<Item>();

  const onSubmit: SubmitHandler<Item> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
      type: row.type,
    };

    try {
      const response = await fetch(`/api/media/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const result = await response.json();
    } catch (error) {
      console.log(error);
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
