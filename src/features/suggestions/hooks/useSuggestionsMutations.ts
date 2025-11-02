import { SuggestionsStatus } from "@/src/types";
import {
  updateReceivedSuggestions,
  updateSuggestionResponse,
} from "../suggestions.actions";
import { useMediaStore } from "../../media/media.store";
import { useUserStore } from "../../user/user.store";
import { useAsyncAction } from "@/src/hooks";
import { unwrapActionResponse } from "@/src/utils/client";

export const useUpdateSuggestionStatus = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();
  const { counts, setCounts } = useUserStore();

  const respondToSuggestion = async (
    mediaId: string,
    status: SuggestionsStatus
  ) => {
    const result = await updateReceivedSuggestions(mediaId, status);
    const newMedia = unwrapActionResponse(result);

    if (status === "ACCEPTED") {
      setWatchlist([newMedia, ...watchlist]);
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
    const suggestion = unwrapActionResponse(result);

    setWatchlist(
      watchlist.map((media) =>
        media.id === suggestion.mediaId
          ? {
              ...media,
              suggestions: media.suggestions?.map((s) =>
                s.id === suggestion.id
                  ? { ...s, receiverComment: suggestion.receiverComment }
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
