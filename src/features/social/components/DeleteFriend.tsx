"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui";
import { useState } from "react";
import { useDeleteFriend } from "../hooks/useSocialMutations";
import { handleError } from "@/src/utils/errorHandlers";

const DeleteFriend = ({ friendId }: { friendId: string }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { deleteContact } = useDeleteFriend();

  const handleDelete = async () => {
    setError(null);
    try {
      await deleteContact(friendId);
      router.push("/dashboard");
    } catch (error) {
      handleError(error, setError);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="italic bg-zinc-900 text-zinc-600 m-4">
          Supprimer ce contact
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce compte ?</AlertDialogTitle>
          <AlertDialogDescription>
            Ce contact et les données associées seront définitivement supprimées
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFriend;
