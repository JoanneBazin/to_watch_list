import { handleActionError } from "@/src/utils/handleActionError";
import { deleteUserAccount, updateUserName } from "../user.action";
import { useUserStore } from "../user.store";

export const useUpdateUser = () => {
  const { user, setUser } = useUserStore.getState();

  const updateName = async (name: string) => {
    try {
      const result = await updateUserName(name);
      setUser(result);
    } catch (error) {
      handleActionError(error, "UpdateUser");
    }
  };

  return { updateName };
};

export const deleteAccount = () => {
  const deleteUser = async () => {
    try {
      await deleteUserAccount();
    } catch (error) {
      handleActionError(error, "DeleteUser");
    }
  };

  return { deleteUser };
};
