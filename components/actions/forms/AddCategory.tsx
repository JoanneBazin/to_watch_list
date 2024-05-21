"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryProps } from "@/lib/types";
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

const AddCategory = ({ onAdded }: { onAdded: () => void }) => {
  const { handleSubmit, register, reset } = useForm<CategoryProps>();

  const onSubmit: SubmitHandler<CategoryProps> = async (data) => {
    const reqData = {
      ...data,
    };
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }
      const result = await response.json();
      reset();
      onAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ajouter une catégorie</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" {...register("name")} className="col-span-3" />
              </div>
            </div>

            <DialogFooter>
              <DialogTrigger asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    toast({
                      title: "Nouvelle catégorie ajoutée !",
                    });
                  }}
                >
                  Envoyer
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
