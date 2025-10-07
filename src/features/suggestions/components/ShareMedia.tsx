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
import { MediaItem } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { IoShareSocial } from "react-icons/io5";
import SendSuggestion from "./SendSuggestion";
import { useState } from "react";

const ShareMedia = ({ media }: { media: MediaItem }) => {
  const contacts = useUserStore((s) => s.contacts);
  const [open, setOpen] = useState(false);

  return (
    <Modal
      trigger={
        <Button
          variant="outline"
          className={
            media.watched ? "bg-zinc-900 hover:bg-zinc-800 border-black" : ""
          }
        >
          <IoShareSocial />
        </Button>
      }
      title={`Envoyer ${media.title} sur la
            watch list de :`}
      open={open}
      setOpen={setOpen}
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

export default ShareMedia;
