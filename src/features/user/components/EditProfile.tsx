"use client";

import { Avatar, Button, Input } from "@/src/components/ui";
import { User } from "@/src/types";
import { FormEvent, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/useUserMutation";
import { handleError } from "@/src/utils/errorHandlers";

const EditProfile = ({ user }: { user: User }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>(user.name);
  const fileInput = useRef<HTMLInputElement>(null);
  const { updateName, updateAvatar } = useUpdateUser();

  const handleEditName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name === user.name) return;
    setError(null);

    try {
      await updateName(name);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);
  };

  const handleEditAvatar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!image) {
      setError("Aucun fichier sélectionné");
      return;
    }

    if (!image.type.startsWith("image/")) {
      setError("Le fichier sélectionné n'est pas une image");
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      setError("Le fichier sélectionné est trop volumineux (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      await updateAvatar(formData);
      setPreview(null);
      setImage(null);
    } catch (error) {
      handleError(error, setError);
    }
  };

  return (
    <>
      <h2>Modifier mon profil</h2>
      <div className="flex justify-center items-center gap-10 my-6">
        <div>
          <form onSubmit={handleEditName}>
            <Input
              defaultValue={name}
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="outline" className="my-4">
              Modifier
            </Button>
          </form>
        </div>

        <div>
          <form onSubmit={handleEditAvatar}>
            <Input
              type="file"
              id="user_avatar"
              accept="image/*"
              onChange={handlePreviewAvatar}
              ref={fileInput}
            />
            {preview && <Avatar img={preview} size="large" />}
            <Button variant="outline" className="my-4">
              Valider
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
