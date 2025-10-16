import { Button, Modal } from "@/src/components/ui";
import { MediaDialogProps } from "@/src/types";
import clsx from "clsx";
import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { EditMediaForm } from "./form/EditMediaForm";

export const EditMediaDialog = ({
  media,
  mobile = false,
  open,
  onOpenChange,
}: MediaDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  return (
    <Modal
      trigger={
        mobile ? null : (
          <Button
            variant="outline"
            className={clsx(
              "table-button",
              media.watched &&
                "bg-accent-dark text-black hover:bg-muted border-black"
            )}
          >
            <BiSolidEditAlt />
          </Button>
        )
      }
      title={`Modifier ${media.title}`}
      open={isOpen}
      setOpen={setIsOpen}
    >
      <EditMediaForm media={media} onSuccess={() => setIsOpen(false)} />
    </Modal>
  );
};
