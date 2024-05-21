"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryProps, Item } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const AddEntryForm = ({
  entry,
  categories,
  onAdded,
}: {
  entry: string;
  categories: CategoryProps[];
  onAdded: () => void;
}) => {
  const { handleSubmit, register, reset } = useForm<Item>();
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [category, setCategory] = useState(categories);

  const fetchCategories = async () => {
    const response = await fetch("/api/category");
    const data = await response.json();
    setCategory(data);
  };

  const onSubmit: SubmitHandler<Item> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
    };

    try {
      const response = await fetch(`/api/${entry}s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }
      const result = await response.json();
      reset();
      setResponseMessage("La to-watch-list a été mise à jour ! 😍");
      onAdded();
    } catch (error) {
      console.log(error);
      setResponseMessage(
        "An error occurred while submitting the form. Please try again later 🫣"
      );
    }
  };

  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={fetchCategories} variant="outline">
              Ajouter {entry}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter {entry}</DialogTitle>
            </DialogHeader>
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
                  <Input
                    id="real"
                    {...register("real")}
                    className="col-span-3"
                  />
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
                    className="flex gap-2 h-10 w-full cursor-default items-center rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Catégorie</option>
                    {category.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    toast({
                      title: responseMessage,
                    });
                  }}
                >
                  Ajouter {entry}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
};

export default AddEntryForm;
