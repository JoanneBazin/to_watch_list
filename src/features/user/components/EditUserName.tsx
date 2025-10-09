import { useState } from "react";
import { useUpdateUser } from "../hooks/useUserMutation";
import { Button, Input, Loader } from "@/src/components/ui";

export const EditUserName = ({ username }: { username: string }) => {
  const [name, setName] = useState<string>(username);
  const { updateUsername, isUpdatingName, updateNameError } = useUpdateUser();

  const handleEditName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name === username) return;
    await updateUsername(name);
  };

  return (
    <div>
      <form onSubmit={handleEditName} className="flex items-center gap-6">
        <Input
          defaultValue={name}
          placeholder={username}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="outline" className="my-4">
          {isUpdatingName ? <Loader /> : "Modifier"}
        </Button>
      </form>
      {updateNameError && <p className="error-message">{updateNameError}</p>}
    </div>
  );
};
