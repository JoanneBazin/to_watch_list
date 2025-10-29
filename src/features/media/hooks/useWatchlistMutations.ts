"use client";

import {
  addExistantMediaToWatchlist,
  addSearchedMediaToWatchlist,
  createCustomMedia,
  deleteFromWatchlist,
  suggestCustomMedia,
  suggestExistantMedia,
  suggestSearchedMedia,
  updateMedia,
  updateWatched,
} from "@/src/features/media/media.actions";
import { useMediaStore } from "../media.store";
import { useUserStore } from "../../user/user.store";
import { useAsyncAction } from "@/src/hooks";
import { MediaFormData, UpdateMediaFormData } from "../media.schema";
import { EntryType, MediaItem } from "@/src/types";
import { ApiError } from "@/src/utils/shared";

export const useAddTMDBMedia = (isSuggestion = false, receiverId?: string) => {
  const { watchlist, setWatchlist } = useMediaStore.getState();
  const { contacts, setContacts } = useUserStore.getState();

  const addMedia = async (
    mediaId: number,
    entry: EntryType,
    senderComment?: string
  ) => {
    if (isSuggestion && receiverId) {
      const result = await suggestSearchedMedia(
        mediaId,
        receiverId,
        entry,
        senderComment
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
    } else {
      const result = await addSearchedMediaToWatchlist(mediaId, entry);
      if (!result) throw new ApiError(500, "Erreur lors de la création");

      setWatchlist([result, ...watchlist]);
    }
  };

  const {
    run: addTMDBMedia,
    isLoading: isAddingMedia,
    error: addError,
  } = useAsyncAction(addMedia);

  return { addTMDBMedia, isAddingMedia, addError };
};

export const useCreateMedia = (isSuggestion = false, receiverId?: string) => {
  const { watchlist, setWatchlist } = useMediaStore.getState();
  const { contacts, setContacts } = useUserStore.getState();

  const create = async (media: MediaFormData, senderComment?: string) => {
    if (isSuggestion && receiverId) {
      const result = await suggestCustomMedia(media, receiverId, senderComment);
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
    } else {
      const result = await createCustomMedia(media);
      if (!result) throw new ApiError(500, "Erreur lors de la création");

      const newItem: MediaItem = {
        ...result,
        addedAt: new Date(),
        watched: false,
      };

      setWatchlist([newItem, ...watchlist]);
    }
  };

  const {
    run: createMedia,
    isLoading: isCreating,
    error: createError,
  } = useAsyncAction(create);

  return { createMedia, isCreating, createError };
};

export const useAddExistantMedia = (
  isSuggestion = false,
  receiverId?: string
) => {
  const { watchlist, setWatchlist } = useMediaStore.getState();
  const { contacts, setContacts } = useUserStore.getState();

  const add = async (mediaId: string, senderComment?: string) => {
    if (isSuggestion && receiverId) {
      const result = await suggestExistantMedia(
        mediaId,
        receiverId,
        senderComment
      );
      if (!result) throw new ApiError(500, "Erreur lors de l'envoi'");
      setContacts(
        contacts.map((contact) =>
          contact.id === receiverId
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
    } else {
      const result = await addExistantMediaToWatchlist(mediaId);
      if (!result) throw new ApiError(500, "Erreur lors de l'ajout");
      setWatchlist([result, ...watchlist]);
    }
  };

  const {
    run: addExistantMedia,
    isLoading: isAddingMedia,
    error: addError,
  } = useAsyncAction(add);

  return { addExistantMedia, isAddingMedia, addError };
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
