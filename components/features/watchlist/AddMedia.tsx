"use client";

import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";

interface AddMediaProps {
  mediaId: string;
}

const AddMedia = ({ mediaId }: AddMediaProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [existantMedia, setExistantMedia] = useState<boolean>();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`/api/media/${mediaId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const result = await response.json();
        setExistantMedia(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, [mediaId]);

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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {added ? (
        <span className="italic">Ajouté à ma liste</span>
      ) : existantMedia ? null : (
        <Button onClick={handleAdd} variant="outline" className="px-6 my-4">
          +
        </Button>
      )}
    </>
  );
};

export default AddMedia;
