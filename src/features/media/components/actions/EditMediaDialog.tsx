import { Button, Modal } from "@/src/components/ui";
import { MediaDialogProps } from "@/src/types";
import clsx from "clsx";
import { useState } from "react";
import { PenLine } from "lucide-react";
import { EditMediaForm } from "../forms";

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
            aria-label="Modifier les informations du média"
            className={clsx(
              "table-button",
              media.watched &&
                "bg-accent-dark text-black hover:bg-muted border-black"
            )}
          >
            <PenLine size={16} />
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
