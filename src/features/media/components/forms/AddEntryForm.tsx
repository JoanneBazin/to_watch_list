"use client";

import { useForm } from "react-hook-form";
import { AddEntryFormProps } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DialogFooter,
  Input,
  Label,
  Loader,
  Textarea,
} from "@/src/components/ui";
import { MediaFormData, mediaSchema } from "../../media.schema";
import { useCreateMedia, useFetchCategories } from "../../hooks";
import { useState } from "react";
import { SendSuggestion } from "@/src/features/suggestions/components";

export const AddEntryForm = ({
  entry,
  isSuggestedMedia = false,
  onSuccess,
  receiverId,
}: AddEntryFormProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
  });
  const [comment, setComment] = useState("");
  const { createMedia, isCreating, createError } = useCreateMedia(
    isSuggestedMedia,
    receiverId,
  );

  const onSubmit = async (data: MediaFormData) => {
    const result = await createMedia(data);

    if (result.success) {
      onSuccess();
    }
  };

  const onSuggestionSubmit = async (comment?: string) => {
    const valid = await trigger();
    if (!valid) return;

    const values = getValues();
    const result = await createMedia(values, comment);

    if (result.success) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={entry} {...register("type")} />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="input-label">
            Titre
          </Label>
          <Input id="title" {...register("title")} className="col-span-3" />
        </div>
        {errors.title && (
          <p className="error-message text-end">{errors.title.message}</p>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="original-title" className="input-label">
            Titre original
          </Label>
          <Input
            id="original-title"
            {...register("originalTitle")}
            className="col-span-3"
          />
        </div>
        {errors.originalTitle && (
          <p className="error-message text-end">
            {errors.originalTitle.message}
          </p>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="synopsis" className="input-label">
            Synopsis
          </Label>
          <Textarea
            id="synopsis"
            {...register("synopsis")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="year" className="input-label">
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
          <Label htmlFor="real" className="input-label">
            Réalisateur
          </Label>
          <Input id="real" {...register("real")} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="platform" className="input-label">
            Plateforme streaming
          </Label>
          <Input
            id="platform"
            {...register("platform")}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="input-label">
            Catégorie
          </Label>
          <Input
            id="category"
            {...register("categories")}
            className="col-span-3"
          />
        </div>
        {errors.categories && (
          <p className="error-message text-end">{errors.categories.message}</p>
        )}
      </div>
      <DialogFooter className="relative">
        {isSuggestedMedia ? (
          <SendSuggestion
            onSubmit={onSuggestionSubmit}
            isLoading={isCreating}
            error={createError}
          />
        ) : (
          <>
            <Button type="submit" className="mt-2">
              {isCreating ? <Loader size="small" /> : "Ajouter"}
            </Button>
            {createError && (
              <p className="absolute error-message top-2 left-0 max-w-75">
                {createError}
              </p>
            )}
          </>
        )}
      </DialogFooter>
    </form>
  );
};
