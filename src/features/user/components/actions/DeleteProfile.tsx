"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Loader,
} from "@/src/components/ui";
import { useDeleteAccount } from "../../hooks";

export const DeleteProfile = () => {
  const { deleteAccount, isDeleting, deleteError } = useDeleteAccount();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    await deleteAccount();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-zinc-900">
          Supprimer mon compte
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce compte ?</AlertDialogTitle>
          <AlertDialogDescription>
            Ce compte et les données associées seront définitivement supprimées
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
