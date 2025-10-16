import {
  deleteUserAccount,
  updateUserAvatar,
  updateUserName,
} from "../user.action";
import { useUserStore } from "../user.store";
import { ApiError, handleSignOut } from "@/src/utils";
import { useAsyncAction } from "@/src/hooks";

export const useUpdateUser = () => {
  const { user, setUser } = useUserStore.getState();
  if (!user) throw new ApiError(401, "Session introuvable ou expirée");

  const updateName = async (name: string) => {
    const result = await updateUserName(name);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");
    setUser({ ...user, name: result.name });
  };

  const updateAvatar = async (formData: FormData) => {
    const result = await updateUserAvatar(formData);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");

    const cacheBuster = `?t=${Date.now()}`;
    setUser({
      ...user,
      image: result.image ? result.image + cacheBuster : null,
    });
  };

  const {
    run: updateUsername,
    isLoading: isUpdatingName,
    error: updateNameError,
  } = useAsyncAction(updateName);

  const {
    run: updateUserImage,
    isLoading: isUpdatingImage,
    error: updateImageError,
  } = useAsyncAction(updateAvatar);

  return {
    updateUsername,
    isUpdatingName,
    updateNameError,
    updateUserImage,
    isUpdatingImage,
    updateImageError,
  };
};

export const useDeleteAccount = () => {
  const deleteUser = async () => {
    await deleteUserAccount();
    handleSignOut();
  };

  const {
    run: deleteAccount,
    isLoading: isDeleting,
    error: deleteError,
  } = useAsyncAction(deleteUser);

  return { deleteAccount, isDeleting, deleteError };
};
