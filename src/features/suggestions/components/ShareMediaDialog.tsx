"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Button,
  Modal,
} from "@/src/components/ui";
import { MediaDialogProps } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { IoShareSocial } from "react-icons/io5";
import SendSuggestion from "./SendSuggestion";
import { useState } from "react";
import clsx from "clsx";

const ShareMediaDialog = ({
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
              media.watched && "bg-zinc-900 hover:bg-zinc-800 border-black"
            )}
          >
            <IoShareSocial />
          </Button>
        )
      }
      title={`Envoyer ${media.title} sur la
            watch list de :`}
      open={isOpen}
      setOpen={setIsOpen}
    >
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex gap-4 items-center justify-start px-4"
          >
            <Avatar img={contact.image} size="small" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={contact.id}>
                <AccordionTrigger>
                  <span className="mr-6">{contact.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {contact.suggestionsFromUser.find((id) => id === media.id) ? (
                    <p>Suggestion envoyée !</p>
                  ) : (
                    <SendSuggestion contactId={contact.id} mediaId={media.id} />
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))
      ) : (
        <span>Pas de contact</span>
      )}
    </Modal>
  );
};

export default ShareMediaDialog;
