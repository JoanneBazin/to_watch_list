import { MediaOptionButtonProps } from "@/src/types";
import { useEffect } from "react";
import { Button } from "@/src/components/ui";
import clsx from "clsx";
import { RxCross1 } from "react-icons/rx";
import { useDeleteFromWatchlist } from "../hooks";

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
      onClick={handleDelete}
      className={clsx(
        "table-button",
        watched && "bg-accent-dark text-black hover:bg-muted border-black",
        mobile && "p-0 text-destructive"
      )}
    >
      {mobile ? "Supprimer de la liste" : <RxCross1 />}
    </Button>
  );
};
