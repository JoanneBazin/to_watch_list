"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { EditMediaFormProps, MediaItem } from "@/src/types";
import { useUpdateMedia } from "@/src/features/media/hooks/useWatchlistMutations";
import {
  Button,
  DialogFooter,
  Input,
  Label,
  Loader,
  Textarea,
} from "@/src/components/ui";

const EditMediaForm = ({ media, onSuccess }: EditMediaFormProps) => {
  const { handleSubmit, register, setValue } = useForm<MediaItem>();
  const { updateWatchlistMedia, isUpdatingMedia, updateError } =
    useUpdateMedia();

  setValue("synopsis", media.synopsis);
  setValue("real", media.real);
  setValue("platform", media.platform);

  if (media.year) {
    setValue("year", media.year);
  }

  const onSubmit: SubmitHandler<MediaItem> = async (data) => {
    const reqData = {
      ...data,
      year: Number(data.year),
      type: media.type,
    };
    const success = await updateWatchlistMedia(media.id, reqData);
    if (success) {
      onSuccess();
    }
  };

  return (
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
      <DialogFooter className="relative">
        <Button type="submit">
          {isUpdatingMedia ? <Loader /> : "Modifier"}
        </Button>
        {updateError && (
          <p className="absolute error-message top-2 left-0 max-w-[300px]">
            {updateError}
          </p>
        )}
      </DialogFooter>
    </form>
  );
};

export default EditMediaForm;
