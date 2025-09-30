import { SuggestionsStatus } from "@/src/types";
import {
  shareMediaSuggestion,
  updateReceivedSuggestions,
  updateSuggestionResponse,
} from "../suggestions.actions";
import { handleActionError } from "@/src/utils/handleActionError";
import { useMediaStore } from "../../media/media.store";
import { useUserStore } from "../../user/user.store";

export const useCreateSuggestion = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const sendSuggestion = async (
    mediaId: string,
    friendId: string,
    comment?: string
  ) => {
    try {
      const result = await shareMediaSuggestion(mediaId, friendId, comment);
      setContacts(
        contacts.map((contact) =>
          contact.id === friendId
            ? {
                ...contact,
                suggestionsFromUser: [
                  ...(contact.suggestionsFromUser || []),
                  result.mediaId,
                ],
              }
            : contact
        )
      );
    } catch (error) {
      handleActionError(error, "UpdateSuggestion");
    }
  };

  return { sendSuggestion };
};

export const useUpdateSuggestionStatus = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const respondToSuggestion = async (
    mediaId: string,
    status: SuggestionsStatus
  ) => {
    try {
      const result = await updateReceivedSuggestions(mediaId, status);
      if (status === "ACCEPTED") {
        setWatchlist([
          ...watchlist,
          {
            ...result,
            addedAt: new Date(),
            watched: false,
          },
        ]);
      }
    } catch (error) {
      handleActionError(error, "UpdateSuggestion");
    }
  };

  return { respondToSuggestion };
};

export const useUpdateSuggestionResponse = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const addResponseComment = async (suggestionId: string, comment: string) => {
    try {
      const result = await updateSuggestionResponse(suggestionId, comment);
      setWatchlist(
        watchlist.map((media) =>
          media.id === result.mediaId
            ? {
                ...media,
                suggestions: media.suggestions?.map((s) =>
                  s.id === result.id
                    ? { ...s, receiverComment: result.receiverComment }
                    : s
                ),
              }
            : media
        )
      );
    } catch (error) {
      handleActionError(error, "UpdateSuggestion");
    }
  };

  return { addResponseComment };
};
