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
import { useDeleteFriend } from "../hooks/useSocialMutations";

const DeleteFriend = ({ friendId }: { friendId: string }) => {
  const router = useRouter();
  const { deleteContact, isDeleting, deleteError } = useDeleteFriend();

  const handleDelete = async () => {
    await deleteContact(friendId);
    router.push("/dashboard");
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
