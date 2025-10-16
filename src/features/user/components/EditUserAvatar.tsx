"use client";

import { Avatar, Button, Input, Loader } from "@/src/components/ui";
import { FormEvent, useRef, useState } from "react";
import { useUpdateUser } from "../hooks";

export const EditUserAvatar = ({
  userAvatar,
}: {
  userAvatar?: string | null;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);
  const { updateUserImage, isUpdatingImage, updateImageError } =
    useUpdateUser();

  const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);
  };

  const handleEditAvatar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileError(null);

    if (!image) {
      setFileError("Aucun fichier sélectionné");
      return;
    }

    if (!image.type.startsWith("image/")) {
      setFileError("Le fichier sélectionné n'est pas une image");
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      setFileError("Le fichier sélectionné est trop volumineux (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", image);

    const result = await updateUserImage(formData);
    if (result.success) {
      setPreview(null);
      setImage(null);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleEditAvatar}
        className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-2 sm:gap-6"
      >
        <div className="flex items-center gap-4">
          <Avatar img={preview ?? userAvatar} size="medium" />
          <Input
            type="file"
            id="user_avatar"
            accept="image/*"
            onChange={handlePreviewAvatar}
            ref={fileInput}
            className="flex-1"
          />
        </div>
        <Button variant="outline" className="w-1/2 sm:w-fit">
          {isUpdatingImage ? <Loader /> : "Valider"}
        </Button>
      </form>
      {updateImageError && <p className="error-message">{updateImageError}</p>}
      {fileError && <p className="error-message">{fileError}</p>}
    </div>
  );
};
