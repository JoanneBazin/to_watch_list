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
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const respondToSuggestion = async (
    mediaId: string,
    status: SuggestionsStatus
  ) => {
    try {
      const result = await updateReceivedSuggestions(mediaId, status);
      if (status === "ACCEPTED") {
        if (result.type === "FILM") {
          setFilms([
            ...films,
            {
              ...result,
              addedAt: new Date(),
              watched: false,
            },
          ]);
        } else {
          setSeries([
            ...series,
            {
              ...result,
              addedAt: new Date(),
              watched: false,
            },
          ]);
        }
      }
    } catch (error) {
      handleActionError(error, "UpdateSuggestion");
    }
  };

  return { respondToSuggestion };
};

export const useUpdateSuggestionResponse = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const addResponseComment = async (suggestionId: string, comment: string) => {
    try {
      await updateSuggestionResponse(suggestionId, comment);
    } catch (error) {
      handleActionError(error, "UpdateSuggestion");
    }
  };

  return { addResponseComment };
};
