import {
  addToContactWatchlist,
  addToWatchlist,
  createMedia,
  deleteFromWatchlist,
  updateMedia,
  updateWatched,
} from "@/src/features/media/media.actions";
import { AddEntryFormValue, MediaItem } from "@/src/types";
import { useMediaStore } from "../media.store";
import { useUserStore } from "../../user/user.store";
import { handleActionError } from "@/src/utils/errorHandlers";

export const useAddMedia = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const createNewUserMedia = async (media: AddEntryFormValue) => {
    try {
      const result = await createMedia(media);
      const newItem: MediaItem = {
        ...result,
        addedAt: (result as MediaItem).addedAt ?? new Date().toISOString(),
        watched: (result as MediaItem).watched ?? false,
      };

      setWatchlist([...watchlist, newItem]);
    } catch (error) {
      handleActionError(error, "AddMedia");
    }
  };

  const addNewUserMedia = async (mediaId: string) => {
    try {
      const result = await addToWatchlist(mediaId);
      setWatchlist([...watchlist, { ...result.media, ...result }]);
    } catch (error) {
      handleActionError(error, "AddMedia");
    }
  };

  const createNewContactMedia = async (
    suggestedMedia: AddEntryFormValue,
    receiverId: string
  ) => {
    const { contacts, setContacts } = useUserStore.getState();

    try {
      const result = await addToContactWatchlist(suggestedMedia, receiverId);
      setContacts(
        contacts.map((c) =>
          c.id === result.receiverId
            ? {
                ...c,
                suggestionsFromUser: [
                  ...(c.suggestionsFromUser || []),
                  result.id,
                ],
              }
            : c
        )
      );
    } catch (error) {
      handleActionError(error, "AddcontactMedia");
    }
  };

  return { createNewUserMedia, addNewUserMedia, createNewContactMedia };
};

export const useUpdateMedia = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const updateItem = async (id: string, data: MediaItem) => {
    try {
      const result = await updateMedia(id, data);

      setWatchlist(
        watchlist.map((media) =>
          media.id === result.id ? { ...media, ...result } : media
        )
      );
    } catch (error) {
      handleActionError(error, "UpdateMedia");
    }
  };

  return { updateItem };
};

export const useToggleWatched = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const updateWatchedItem = async (id: string) => {
    try {
      const result = await updateWatched(id);

      setWatchlist(
        watchlist.map((media) =>
          media.id === result.mediaId
            ? { ...media, watched: result.watched }
            : media
        )
      );
    } catch (error) {
      handleActionError(error, "UpdateWatched");
    }
  };

  return { updateWatchedItem };
};

export const useDeleteFromWatchlist = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const deleteItem = async (id: string) => {
    try {
      const result = await deleteFromWatchlist(id);

      setWatchlist(watchlist.filter((media) => media.id !== result.mediaId));
    } catch (error) {
      handleActionError(error, "DeleteMedia");
    }
  };

  return { deleteItem };
};
