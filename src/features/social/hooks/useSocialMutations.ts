import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "../social.action";
import { FriendRequestStatus } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { useAsyncAction } from "@/src/hooks";
import { unwrapActionResponse } from "@/src/utils/client";

export const useSendFriendRequest = () => {
  const addNewFriend = async (receiverId: string) => {
    const result = await addFriendRequest(receiverId);
    unwrapActionResponse(result);
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
    const request = unwrapActionResponse(result);

    if (request.status === "ACCEPTED") {
      setContacts([
        ...contacts,
        { ...request.sender, suggestionsFromUser: { dbId: [], tmdbId: [] } },
      ]);
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
    const contactId = unwrapActionResponse(result);

    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const {
    run: deleteContact,
    isLoading: isDeleting,
    error: deleteError,
  } = useAsyncAction(deleteFriendshipLink);

  return { deleteContact, isDeleting, deleteError };
};
