import { handleActionError } from "@/src/utils/errorHandlers";
import {
  deleteUserAccount,
  updateUserAvatar,
  updateUserName,
} from "../user.action";
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

  const updateAvatar = async (formData: FormData) => {
    try {
      const result = await updateUserAvatar(formData);
      setUser(result);
    } catch (error) {
      handleActionError(error, "UpdateUser");
    }
  };

  return { updateName, updateAvatar };
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
