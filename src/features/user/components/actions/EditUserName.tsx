import { useState } from "react";
import { useUpdateUser } from "../../hooks";
import { Button, Input, Loader } from "@/src/components/ui";

export const EditUserName = ({ username }: { username: string }) => {
  const [name, setName] = useState<string>(username);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { updateUsername, isUpdatingName, updateNameError } = useUpdateUser();

  const handleEditName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (!name || name === username) return;
    if (name.length > 20) {
      setValidationError("Le nom est trop long");
      return;
    }

    await updateUsername(name);
  };

  return (
    <div>
      <form
        onSubmit={handleEditName}
        className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-3 sm:gap-6"
      >
        <label htmlFor="user-name" className="sr-only">
          Modifier le nom utilisateur
        </label>
        <Input
          defaultValue={name}
          id="user-name"
          placeholder={username}
          onChange={(e) => setName(e.target.value)}
          className="sm:w-1/3"
        />
        <Button variant="outline" className="w-1/2 sm:w-fit">
          {isUpdatingName ? <Loader size="small" /> : "Modifier"}
        </Button>
      </form>
      {updateNameError && (
        <p className="error-message text-end mt-3">{updateNameError}</p>
      )}
      {validationError && (
        <p className="error-message text-end mt-3">{validationError}</p>
      )}
    </div>
  );
};
