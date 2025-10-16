import { SuggestionsStatus } from "@/src/types";
import {
  shareMediaSuggestion,
  updateReceivedSuggestions,
  updateSuggestionResponse,
} from "../suggestions.actions";
import { useMediaStore } from "../../media/media.store";
import { useUserStore } from "../../user/user.store";
import { ApiError } from "@/src/utils";
import { useAsyncAction } from "@/src/hooks";

export const useCreateSuggestion = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const sendSuggestion = async (
    mediaId: string,
    friendId: string,
    comment?: string
  ) => {
    const result = await shareMediaSuggestion(mediaId, friendId, comment);
    if (!result) throw new ApiError(500, "Erreur lors de l'envoi'");
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
  };

  const {
    run: shareMedia,
    isLoading: isSharing,
    error: shareError,
  } = useAsyncAction(sendSuggestion);

  return { shareMedia, isSharing, shareError };
};

export const useUpdateSuggestionStatus = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();
  const { counts, setCounts } = useUserStore();

  const respondToSuggestion = async (
    mediaId: string,
    status: SuggestionsStatus
  ) => {
    const result = await updateReceivedSuggestions(mediaId, status);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");

    if (status === "ACCEPTED") {
      const newMedia = { ...result, ...result.media, media: undefined };
      setWatchlist([...watchlist, newMedia]);
    }
    setCounts({ ...counts, suggestions: counts.suggestions - 1 });
  };

  const {
    run: updateSuggestion,
    isLoading: isUpdating,
    error: updateError,
  } = useAsyncAction(respondToSuggestion);

  return { updateSuggestion, isUpdating, updateError };
};

export const useUpdateSuggestionResponse = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const addResponseComment = async (suggestionId: string, comment: string) => {
    const result = await updateSuggestionResponse(suggestionId, comment);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");

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
  };

  const {
    run: sendComment,
    isLoading: isUpdating,
    error: updateError,
  } = useAsyncAction(addResponseComment);

  return { sendComment, isUpdating, updateError };
};
