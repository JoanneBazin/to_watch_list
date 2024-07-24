"use client";

import { Button } from "@/components/ui/button";

const EditProfile = ({ userId }: { userId: string }) => {
  const handleEdit = async () => {
    console.log(userId);
  };

  return <Button onClick={() => handleEdit()}>Modifier mon profil</Button>;
};

export default EditProfile;
