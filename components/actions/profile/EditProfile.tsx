"use client";

import { Avatar } from "@/components/layout/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EditProfile = ({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleEdit = async () => {
    if (!image) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: image }),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Modifier mon profil</h2>
      <div className="flex justify-between">
        <div className="my-6 mx-4">
          <Input defaultValue={userName} placeholder={userName} />
          <Button>Modifier</Button>
        </div>

        <div className="my-6 mx-4">
          <p>Add</p>
          <form onSubmit={handleEdit}>
            <Input
              type="file"
              id="user_avatar"
              accept="image/*"
              onChange={handleAddAvatar}
            />
            {preview && <Avatar img={preview} size="large" />}
            <Button>Valider</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
