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

interface ShareProps {
  row: Item;
  entry: string;
  friends: FriendsProps[];
}

const ShareEntry = ({ row, entry, friends }: ShareProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IoShareSocial />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="m-2">Envoyer sur la watch list :</DialogTitle>
        </DialogHeader>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.id} className="flex gap-4 items-center">
              <Image src={friend.avatar} alt="avatar" width={40} height={20} />
              <span>{friend.name}</span>
              <SendSuggestion
                entry={entry}
                friendId={friend.id}
                rowId={row.id}
              />
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
