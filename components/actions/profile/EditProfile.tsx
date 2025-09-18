"use client";

import { Avatar } from "@/components/layout/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserProps } from "@/lib/types";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

interface EditProfileProps {
  user: UserProps;
  updateUser: Dispatch<SetStateAction<UserProps | null>>;
}

const EditProfile = ({ user, updateUser }: EditProfileProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleEditName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedName || updatedName === user.name) return;

    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const updatedUserName = {
        ...user,
        name: updatedName,
      };

      updateUser(updatedUserName);
    } catch (error) {
      console.log(error);
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

      updateUser(updatedUserAvatar);
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
              defaultValue={user.name}
              placeholder={user.name}
              onChange={(e) => setUpdatedName(e.target.value)}
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
