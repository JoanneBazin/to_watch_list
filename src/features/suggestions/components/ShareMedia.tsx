"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui";
import { MediaItem } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { IoShareSocial } from "react-icons/io5";
import SendSuggestion from "./SendSuggestion";

const ShareMedia = ({ media }: { media: MediaItem }) => {
  const contacts = useUserStore((s) => s.contacts);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={
            media.watched ? "bg-zinc-900 hover:bg-zinc-800 border-black" : ""
          }
        >
          <IoShareSocial />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="m-2 font-semibold">
            Envoyer <span className="font-bold">{media.title}</span> sur la
            watch list de :
          </DialogTitle>
        </DialogHeader>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex gap-4 items-center justify-start hover:bg-zinc-700 px-4"
            >
              <Avatar img={contact.image} size="small" />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={contact.id}>
                  <AccordionTrigger>
                    <span className="mr-6">{contact.name}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {contact.suggestionsFromUser.find(
                      (id) => id === media.id
                    ) ? (
                      <p>Suggestion envoyée !</p>
                    ) : (
                      <SendSuggestion friendId={contact.id} media={media} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))
        ) : (
          <span>Pas de contact</span>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareMedia;
