import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui";
import { MediaOptionsProps } from "@/src/types";
import clsx from "clsx";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import ShareMediaDialog from "../../suggestions/components/ShareMediaDialog";
import { EditMediaDialog } from "./EditMediaDialog";
import { DeleteMediaButton } from "./DeleteMediaButton";
import { useMobileDialog } from "@/src/hooks/useMobileDialog";

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
            className={clsx(
              "table-button p-0",
              media.watched && "bg-zinc-900 hover:bg-zinc-800 border-black"
            )}
          >
            <CiMenuKebab size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleOpenDialog("share")}
            className="pt-2"
          >
            Partager {media.title}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleOpenDialog("edit")}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem className="px-0">
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
      <EditMediaDialog
        media={media}
        mobile={true}
        {...getDialogProps("edit")}
      />
    </>
  );
};
