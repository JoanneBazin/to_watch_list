"use client";

import {
  addSearchedMedia,
  addSearchedMediaToContactWatchlist,
  addToContactWatchlist,
  addToWatchlist,
  createMedia,
  deleteFromWatchlist,
  updateMedia,
  updateWatched,
} from "@/src/features/media/media.actions";
import { useMediaStore } from "../media.store";
import { useUserStore } from "../../user/user.store";
import { useAsyncAction } from "@/src/hooks";
import { MediaFormData, UpdateMediaFormData } from "../media.schema";
import { EntryType, MediaItem } from "@/src/types";
import { ApiError } from "@/src/utils/shared";

export const useAddSearchedMediaToWatchlist = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const addNewUserMedia = async (mediaId: number, entry: EntryType) => {
    const result = await addSearchedMedia(mediaId, entry);

    if (!result) throw new ApiError(500, "Erreur lors de la création");

    const newItem: MediaItem = {
      ...result,
      addedAt: new Date(),
      watched: false,
    };

    setWatchlist([newItem, ...watchlist]);
  };

  const {
    run: addNewMedia,
    isLoading: isAddingMedia,
    error: addError,
  } = useAsyncAction(addNewUserMedia);

  return { addNewMedia, isAddingMedia, addError };
};

export const useCreateMedia = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const createNewUserMedia = async (media: MediaFormData) => {
    const result = await createMedia(media);
    if (!result) throw new ApiError(500, "Erreur lors de la création");

    const newItem: MediaItem = {
      ...result,
      addedAt: new Date(),
      watched: false,
    };

    setWatchlist([newItem, ...watchlist]);
  };

  const {
    run: createNewMedia,
    isLoading: isCreatingMedia,
    error: createError,
  } = useAsyncAction(createNewUserMedia);

  return { createNewMedia, isCreatingMedia, createError };
};

export const useAddToWatchlist = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const addNewUserMedia = async (mediaId: string) => {
    const result = await addToWatchlist(mediaId);
    if (!result) throw new ApiError(500, "Erreur lors de l'ajout");
    setWatchlist([...watchlist, { ...result.media, ...result }]);
  };

  const {
    run: addMedia,
    isLoading: isAddingMedia,
    error: addError,
  } = useAsyncAction(addNewUserMedia);

  return { addMedia, isAddingMedia, addError };
};

export const useAddSearchedMediaToContactWatchlist = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const addNewContactMedia = async (
    mediaId: number,
    receiverId: string,
    entry: EntryType
  ) => {
    const result = await addSearchedMediaToContactWatchlist(
      mediaId,
      receiverId,
      entry
    );

    if (!result) throw new ApiError(500, "Erreur lors de la création");

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
  };

  const {
    run: addNewcontactMedia,
    isLoading: isAddingContactMedia,
    error: addContactError,
  } = useAsyncAction(addNewContactMedia);

  return { addNewContactMedia, isAddingContactMedia, addContactError };
};

export const useCreateContactMedia = () => {
  const { contacts, setContacts } = useUserStore.getState();

  const createNewContactMedia = async (
    suggestedMedia: MediaFormData,
    receiverId: string
  ) => {
    const result = await addToContactWatchlist(suggestedMedia, receiverId);
    if (!result) throw new ApiError(500, "Erreur lors de l'ajout");
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
  };

  const {
    run: sendingMedia,
    isLoading: isSendingMedia,
    error: sendingError,
  } = useAsyncAction(createNewContactMedia);

  return { sendingMedia, isSendingMedia, sendingError };
};

export const useUpdateMedia = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const updateItem = async (id: string, data: UpdateMediaFormData) => {
    const result = await updateMedia(id, data);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");
    setWatchlist(
      watchlist.map((media) =>
        media.id === result.id ? { ...media, ...result } : media
      )
    );
  };

  const {
    run: updateWatchlistMedia,
    isLoading: isUpdatingMedia,
    error: updateError,
  } = useAsyncAction(updateItem);

  return { updateWatchlistMedia, isUpdatingMedia, updateError };
};

export const useToggleWatched = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const updateWatchedItem = async (id: string) => {
    const result = await updateWatched(id);
    if (!result) throw new ApiError(500, "Erreur lors de la mise à jour");
    setWatchlist(
      watchlist.map((media) =>
        media.id === result.mediaId
          ? { ...media, watched: result.watched }
          : media
      )
    );
  };
  const {
    run: toggleWatched,
    isLoading: isTogglingWatched,
    error: toggleError,
  } = useAsyncAction(updateWatchedItem);

  return { toggleWatched, isTogglingWatched, toggleError };
};

export const useDeleteFromWatchlist = () => {
  const { watchlist, setWatchlist } = useMediaStore.getState();

  const deleteItem = async (id: string) => {
    const result = await deleteFromWatchlist(id);
    if (!result) throw new ApiError(500, "Erreur lors de la suppression");
    setWatchlist(watchlist.filter((media) => media.id !== result.mediaId));
  };

  const {
    run: deleteMedia,
    isLoading: isDeletingMedia,
    error: deleteError,
  } = useAsyncAction(deleteItem);

  return { deleteMedia, isDeletingMedia, deleteError };
};
