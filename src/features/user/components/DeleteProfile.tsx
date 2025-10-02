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
} from "@/src/components/ui";
import { signOut } from "@/src/lib/auth-client";
import { deleteAccount } from "../hooks/useUserMutation";
import { useState } from "react";
import { handleError } from "@/src/utils/errorHandlers";

const DeleteProfile = () => {
  const { deleteUser } = deleteAccount();
  const [error, setError] = useState<string | null>(null);
  const handleDelete = async () => {
    try {
      await deleteUser();
      signOut();
    } catch (error) {
      handleError(error, setError);
    }
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

export default DeleteProfile;
