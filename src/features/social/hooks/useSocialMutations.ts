import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "../social.action";
import { FriendRequestStatus } from "@/src/types";
import { useUserStore } from "../../user/user.store";
import { handleActionError } from "@/src/utils/errorHandlers";

export const useSendFriendRequest = () => {
  const addNewFriend = async (receiverId: string) => {
    try {
      await addFriendRequest(receiverId);
    } catch (error) {
      handleActionError(error, "AddFriendRequest");
    }
  };

  return { addNewFriend };
};

export const useUpdateRequest = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const updateFriendStatus = async (
    requestId: string,
    status: FriendRequestStatus
  ) => {
    try {
      const result = await updateFriendRequestStatus(requestId, status);
      if (result.status === "ACCEPTED") {
        setContacts([
          ...contacts,
          { ...result.sender, suggestionsFromUser: [] },
        ]);
      }
    } catch (error) {
      handleActionError(error, "UpdateFriendRequest");
    }
  };

  return { updateFriendStatus };
};

export const useDeleteFriend = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const deleteContact = async (friendId: string) => {
    try {
      await deleteFriend(friendId);
      setContacts(contacts.filter((contact) => contact.id !== friendId));
    } catch (error) {
      handleActionError(error, "DeleteFriend");
    }
  };

  return { deleteContact };
};
