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
import { useDeleteFriend } from "../../hooks";
import { Trash } from "lucide-react";

export const DeleteFriend = ({ friendId }: { friendId: string }) => {
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
          className="bg-zinc-900 m-4 mb-0 text-xs px-3 sm:px-4"
        >
          <Trash size={14} className="sm:hidden" />
          <p className="hidden sm:block">Supprimer ce contact</p>
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
          <div className="flex gap-2 items-center">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => handleDelete(e)}>
              {isDeleting ? <Loader size="small" /> : "Supprimer"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
