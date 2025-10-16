import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "../social.action";
import { FriendRequestStatus } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { useAsyncAction } from "@/src/hooks";
import { ApiError } from "@/src/utils/shared";

export const useSendFriendRequest = () => {
  const addNewFriend = async (receiverId: string) => {
    await addFriendRequest(receiverId);
  };

  const {
    run: addFriend,
    isLoading: isAddingFriend,
    error: addingError,
  } = useAsyncAction(addNewFriend);

  return { addFriend, isAddingFriend, addingError };
};

export const useUpdateRequest = () => {
  const { contacts, setContacts, counts, setCounts } = useUserStore.getState();

  const updateFriendStatus = async (
    requestId: string,
    status: FriendRequestStatus
  ) => {
    const result = await updateFriendRequestStatus(requestId, status);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");
    if (result.status === "ACCEPTED") {
      setContacts([...contacts, { ...result.sender, suggestionsFromUser: [] }]);
    }
    setCounts({ ...counts, friendRequests: counts.friendRequests - 1 });
  };

  const {
    run: updateRequest,
    isLoading: isUpdating,
    error: updateError,
  } = useAsyncAction(updateFriendStatus);

  return { updateRequest, isUpdating, updateError };
};

export const useDeleteFriend = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const deleteFriendshipLink = async (friendId: string) => {
    const result = await deleteFriend(friendId);
    if (!result?.success)
      throw new ApiError(500, "Erreur lors de la suppression");
    setContacts(contacts.filter((contact) => contact.id !== friendId));
  };

  const {
    run: deleteContact,
    isLoading: isDeleting,
    error: deleteError,
  } = useAsyncAction(deleteFriendshipLink);

  return { deleteContact, isDeleting, deleteError };
};
