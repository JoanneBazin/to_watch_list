"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Item, SuggestionItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useFetchCategories } from "@/components/hooks/useFetchCategories";
import { Textarea } from "@/components/ui/textarea";

interface EntryProps {
  entry: string;
  receiverId: string;
}
const AddSuggestion = ({ entry, receiverId }: EntryProps) => {
  const { handleSubmit, register, reset } = useForm<SuggestionItem>();
  const [responseMessage, setResponseMessage] = useState<string>(
    "Suggestion envoyée 👍"
  );

  const { categories } = useFetchCategories();

  const onSubmit: SubmitHandler<Item> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
      type: entry,
      receiverId: receiverId,
    };

    try {
      const response = await fetch(`/api/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const result = await response.json();
      reset();
      setResponseMessage(`Suggestion ${result.title} envoyée 👍`);
    } catch (error) {
      console.log(error);
      setResponseMessage("An error occurred while submitting the form 🫣");
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
      <div className="grid grid-cols-4 items-center gap-4 my-6">
        <Label htmlFor="comment" className="text-right">
          Ajouter un commentaire
        </Label>
        <Textarea
          id="comment"
          {...register("comment")}
          className="col-span-3"
        />
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
          Envoyer
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddSuggestion;
