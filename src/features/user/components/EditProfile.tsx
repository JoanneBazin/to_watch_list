"use client";

import { Avatar, Button, Input } from "@/src/components/ui";
import { User } from "@/src/types";
import { FormEvent, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/useUserMutation";
import { handleError } from "@/src/utils/errorHandlers";

const EditProfile = ({ user }: { user: User }) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>(user.name);
  const fileInput = useRef<HTMLInputElement>(null);
  const { updateName } = useUpdateUser();

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

  const handleAddAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result && typeof result === "string") {
        setImage(result.split(",")[1]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditAvatar = async (e: FormEvent<HTMLFormElement>) => {
    if (!image) return;

    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: image }),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      setPreview(null);
      if (fileInput.current) {
        fileInput.current.value = "";
      }

      const updatedUserAvatar = {
        ...user,
        avatar: image,
      };

      // updateUser(updatedUserAvatar);
    } catch (error) {
      console.log(error);
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
              onChange={handleAddAvatar}
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
