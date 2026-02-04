"use client";

import { Button, Loader } from "@/src/components/ui";
import { FriendRequestStatus, ValidateFriendRequestProps } from "@/src/types";
import Link from "next/link";
import { useState } from "react";
import { useUpdateRequest } from "../../hooks";
import { Check, X } from "lucide-react";

export const ValidateFriendRequest = ({
  requestId,
  senderId,
}: ValidateFriendRequestProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const { updateRequest, isUpdating, updateError } = useUpdateRequest();

  const handleRespondToFriendRequest = async (status: FriendRequestStatus) => {
    const result = await updateRequest(requestId, status);
    if (result.success) {
      if (status === "ACCEPTED") {
        setAdded(true);
      } else {
        setDeleted(true);
      }
    }
  };

  if (isUpdating) {
    return <Loader />;
  }

  if (added) {
    return (
      <div className="flex gap-2 items-center">
        <Button variant="ghost" className="text-xs md:text-sm px-2">
          <Link href={`/user/${senderId}`}>Voir le profil</Link>
        </Button>
      </div>
    );
  }

  if (deleted) {
    return;
  }

  if (updateError) {
    return <p className="error-message italic">{updateError}</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center justify-end">
        <Button
          aria-label="Accepter la demande d'amis"
          variant="ghost"
          className="px-2"
          onClick={() => {
            handleRespondToFriendRequest("ACCEPTED");
          }}
        >
          <Check />
        </Button>
        <Button
          aria-label="Refuser la demande d'amis"
          variant="ghost"
          className="px-2 text-destructive"
          onClick={() => {
            handleRespondToFriendRequest("REFUSED");
          }}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
