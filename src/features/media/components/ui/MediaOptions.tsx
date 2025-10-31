import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui";
import { MediaOptionsProps } from "@/src/types";
import clsx from "clsx";
import { useMobileDialog } from "@/src/hooks";
import { ShareMediaDialog } from "../../../suggestions/components";
import { DeleteMediaButton } from "../actions";
import { EllipsisVertical } from "lucide-react";

export const MediaOptions = ({ media, onError }: MediaOptionsProps) => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    handleOpenDialog,
    getDialogProps,
  } = useMobileDialog();

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label="Voir les options"
            className={clsx(
              "table-button p-0",
              media.watched &&
                "bg-accent-dark text-black hover:bg-muted border-black"
            )}
          >
            <EllipsisVertical size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleOpenDialog("share")}
            className="pt-2 text-xs"
          >
            Partager {media.title}
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <DeleteMediaButton
              mediaId={media.id}
              watched={media.watched}
              setError={onError}
              mobile={true}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareMediaDialog
        media={media}
        mobile={true}
        {...getDialogProps("share")}
      />
    </>
  );
};
