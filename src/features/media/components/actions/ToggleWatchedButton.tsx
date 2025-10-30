import { Button } from "@/src/components/ui";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { useToggleWatched } from "../../hooks";
import { useEffect } from "react";
import { MediaOptionButtonProps } from "@/src/types";

export const ToggleWatchedButton = ({
  mediaId,
  watched,
  setError,
}: MediaOptionButtonProps) => {
  const { toggleWatched, toggleError } = useToggleWatched();

  useEffect(() => {
    if (toggleError) {
      setError(toggleError);
    }
  }, [toggleError, setError]);

  const handleToggleWatched = async () => {
    setError(null);
    await toggleWatched(mediaId);
  };
  return (
    <Button
      variant="outline"
      onClick={handleToggleWatched}
      className={clsx(
        "table-button border-background md:border-input",
        watched && "bg-accent-dark text-black hover:bg-muted md:border-black"
      )}
    >
      <FaCheck />
    </Button>
  );
};
