import { MediaOptionButtonProps } from "@/src/types";
import { useDeleteFromWatchlist } from "../hooks/useWatchlistMutations";
import { useEffect } from "react";
import { Button } from "@/src/components/ui";
import clsx from "clsx";
import { RxCross1 } from "react-icons/rx";

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
        watched && "bg-zinc-900 hover:bg-zinc-800 border-black",
        mobile && "px-0"
      )}
    >
      {mobile ? "Supprimer de la liste" : <RxCross1 />}
    </Button>
  );
};
