"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddMediaProps {
  mediaId: string;
}

const AddMedia = ({ mediaId }: AddMediaProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [existantMedia, setExistantMedia] = useState<boolean>(false);

  const handleAdd = async () => {
    try {
      const response = await fetch(`/api/media/${mediaId}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to add");
      }

      const result = await response.json();

      if (result.success) {
        setAdded(true);
      } else {
        setExistantMedia(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {added ? (
        <span className="italic">Ajouté</span>
      ) : existantMedia ? (
        <span className="italic">Déjà dans ma liste</span>
      ) : (
        <Button onClick={handleAdd} variant="outline">
          +
        </Button>
      )}
    </>
  );
};

export default AddMedia;
