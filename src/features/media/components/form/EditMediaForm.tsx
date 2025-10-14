"use client";

import { useForm } from "react-hook-form";
import { EditMediaFormProps } from "@/src/types";
import { useUpdateMedia } from "@/src/features/media/hooks/useWatchlistMutations";
import {
  Button,
  DialogFooter,
  Input,
  Label,
  Loader,
  Textarea,
} from "@/src/components/ui";
import { UpdateMediaFormData, updateMediaSchema } from "../../media.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const EditMediaForm = ({ media, onSuccess }: EditMediaFormProps) => {
  const { handleSubmit, register, setValue } = useForm<UpdateMediaFormData>({
    resolver: zodResolver(updateMediaSchema),
  });
  const { updateWatchlistMedia, isUpdatingMedia, updateError } =
    useUpdateMedia();

  setValue("synopsis", media.synopsis);
  setValue("real", media.real);
  setValue("platform", media.platform);
  setValue("year", String(media.year));

  const onSubmit = async (data: UpdateMediaFormData) => {
    const result = await updateWatchlistMedia(media.id, data);
    if (result.success) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
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
      </div>
      <DialogFooter className="relative">
        <Button type="submit" className="mt-2">
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
