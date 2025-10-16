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
import {
  useCreateContactMedia,
  useCreateMedia,
  useFetchCategories,
} from "../../hooks";

export const AddEntryForm = ({
  entry,
  isSuggestedMedia,
  onSuccess,
  receiverId,
}: AddEntryFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
  });
  const { createNewMedia, isCreatingMedia, createError } = useCreateMedia();
  const { sendingMedia, isSendingMedia, sendingError } =
    useCreateContactMedia();

  const {
    categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetchCategories();

  const onSubmit = async (data: MediaFormData) => {
    const reqData = {
      ...data,
      type: entry,
    };

    let result = { success: false };

    if (isSuggestedMedia && receiverId) {
      result = await sendingMedia(reqData, receiverId);
    } else {
      result = await createNewMedia(reqData);
    }

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
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            {errors.categoryName && (
              <p className="error-message">{errors.categoryName.message}</p>
            )}
          </div>
          <select
            id="category"
            {...register("categoryName")}
            className="flex gap-2 h-10 cursor-default items-center rounded-lg border border-input bg-background px-1 md:px-3 py-2 text-xs md:text-sm overflow-y-scroll ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Catégorie</option>
            {categoryError && (
              <option disabled className="italic">
                {categoryError}
              </option>
            )}
            {!categoryLoading &&
              !categoryError &&
              categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {isSuggestedMedia && (
          <div>
            <Label htmlFor="senderComment" className="input-label">
              Laissez un commentaire ?
            </Label>
            <Textarea
              id="senderComment"
              {...register("senderComment")}
              className="col-span-3"
            />
          </div>
        )}
      </div>
      <DialogFooter className="relative">
        <Button type="submit" className="mt-2">
          {isCreatingMedia || isSendingMedia ? <Loader /> : "Ajouter"}
        </Button>
        {createError && (
          <p className="absolute error-message top-2 left-0 max-w-[300px]">
            {createError}
          </p>
        )}
        {sendingError && (
          <p className="absolute error-message top-2 left-0 max-w-[300px]">
            {sendingError}
          </p>
        )}
      </DialogFooter>
    </form>
  );
};
