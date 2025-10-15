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
  Loader,
} from "@/src/components/ui";
import { useDeleteFriend } from "../hooks/useSocialMutations";
import { Trash } from "lucide-react";

const DeleteFriend = ({ friendId }: { friendId: string }) => {
  const router = useRouter();
  const { deleteContact, isDeleting, deleteError } = useDeleteFriend();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await deleteContact(friendId);
    if (result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className=" m-4"
          aria-label="Supprimer ce contact"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce compte ?</AlertDialogTitle>
          <AlertDialogDescription>
            Ce contact et les données associées seront définitivement supprimées
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4 items-center">
          {deleteError && <p className="error-message">{deleteError}</p>}
          <div className="flex gap-2">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => handleDelete(e)}>
              {isDeleting ? <Loader /> : "Supprimer"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFriend;
