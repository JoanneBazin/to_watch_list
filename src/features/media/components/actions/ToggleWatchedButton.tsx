import { Button } from "@/src/components/ui";
import clsx from "clsx";
import { useToggleWatched } from "../../hooks";
import { useEffect } from "react";
import { MediaOptionButtonProps } from "@/src/types";
import { Check } from "lucide-react";

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
      aria-label="Marquer le titre comme vu/non-vu"
      onClick={handleToggleWatched}
      className={clsx(
        "table-button border-background md:border-input",
        watched && "bg-accent-dark text-black hover:bg-muted md:border-black"
      )}
    >
      <Check size={18} />
    </Button>
  );
};
