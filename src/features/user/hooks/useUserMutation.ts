import {
  deleteUserAccount,
  updateUserAvatar,
  updateUserName,
} from "../user.action";
import { useUserStore } from "../user.store";
import { handleSignOut, unwrapActionResponse } from "@/src/utils/client";
import { useAsyncAction } from "@/src/hooks";
import { ApiError } from "@/src/utils/shared";

export const useUpdateUser = () => {
  const { user, setUser } = useUserStore.getState();
  if (!user) throw new ApiError(401, "Session introuvable ou expirée");

  const updateName = async (name: string) => {
    const result = await updateUserName(name);
    const { name: username } = unwrapActionResponse(result);

    setUser({ ...user, name: username });
  };

  const updateAvatar = async (formData: FormData) => {
    const result = await updateUserAvatar(formData);
    const { image } = unwrapActionResponse(result);

    const cacheBuster = `?t=${Date.now()}`;
    setUser({
      ...user,
      image: image ? image + cacheBuster : null,
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
    const result = await deleteUserAccount();
    unwrapActionResponse(result);
    handleSignOut();
  };

  const {
    run: deleteAccount,
    isLoading: isDeleting,
    error: deleteError,
  } = useAsyncAction(deleteUser);

  return { deleteAccount, isDeleting, deleteError };
};
