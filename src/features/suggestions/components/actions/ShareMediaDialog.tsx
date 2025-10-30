"use client";

import { Button, Modal } from "@/src/components/ui";
import { MediaDialogProps } from "@/src/types";
import { useUserStore } from "../../../user/user.store";
import { IoShareSocial } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";
import { SuggestMediaToContact } from "./SuggestMediaToContact";

export const ShareMediaDialog = ({
  media,
  mobile = false,
  open,
  onOpenChange,
}: MediaDialogProps) => {
  const contacts = useUserStore((s) => s.contacts);
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
            <IoShareSocial />
          </Button>
        )
      }
      title={`Envoyer ${media.title} sur la
            liste de :`}
      open={isOpen}
      setOpen={setIsOpen}
    >
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <SuggestMediaToContact
            key={contact.id}
            contact={contact}
            mediaId={media.id}
          />
        ))
      ) : (
        <span>Pas de contact</span>
      )}
    </Modal>
  );
};
