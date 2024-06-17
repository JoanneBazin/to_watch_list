"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FriendsProps, Item } from "@/lib/types";
import Image from "next/image";
import { IoShareSocial } from "react-icons/io5";
import SendSuggestion from "./SendSuggestion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ShareProps {
  row: Item;
  friends: FriendsProps[];
}

const ShareEntry = ({ row, friends }: ShareProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IoShareSocial />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="m-2 font-semibold">
            Envoyer <span className="font-bold">{row.title}</span> sur la watch
            list de :
          </DialogTitle>
        </DialogHeader>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex gap-4 items-center justify-start hover:bg-zinc-700 px-4"
            >
              <Image src={friend.avatar} alt="avatar" width={40} height={20} />
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={friend.id}>
                  <AccordionTrigger>
                    <span className="mr-6">{friend.name}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <SendSuggestion friendId={friend.id} rowId={row.id} />
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

export default ShareEntry;
