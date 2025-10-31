import { MediaOptionButtonProps } from "@/src/types";
import { useEffect } from "react";
import { Button } from "@/src/components/ui";
import clsx from "clsx";
import { useDeleteFromWatchlist } from "../../hooks";
import { X } from "lucide-react";

export const DeleteMediaButton = ({
  mediaId,
  watched,
  setError,
  mobile = false,
}: MediaOptionButtonProps) => {
  const { deleteMedia, deleteError } = useDeleteFromWatchlist();

  useEffect(() => {
    if (deleteError) {
      setError(deleteError);
    }
  }, [deleteError, setError]);

  const handleDelete = async () => {
    await deleteMedia(mediaId);
  };

  return (
    <Button
      variant={mobile ? "ghost" : "outline"}
      aria-label="Supprimer le titre de la liste"
      onClick={handleDelete}
      className={clsx(
        "table-button",
        watched && "bg-accent-dark text-black hover:bg-muted border-black",
        mobile && "p-0 text-destructive"
      )}
    >
      {mobile ? "Supprimer de la liste" : <X size={16} />}
    </Button>
  );
};
