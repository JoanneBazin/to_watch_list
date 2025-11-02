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
import { unwrapActionResponse } from "@/src/utils/client";

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
      const suggestion = unwrapActionResponse(result);

      setContacts(
        contacts.map((c) =>
          c.id === suggestion.receiverId
            ? {
                ...c,
                suggestionsFromUser: {
                  dbId: [...c.suggestionsFromUser.dbId, suggestion.mediaId],
                  tmdbId: [
                    ...c.suggestionsFromUser.tmdbId,
                    ...(suggestion.media.tmdbId
                      ? [suggestion.media.tmdbId]
                      : []),
                  ],
                },
              }
            : c
        )
      );
    } else {
      const result = await addSearchedMediaToWatchlist(mediaId, entry);
      const newMedia = unwrapActionResponse(result);

      setWatchlist([newMedia, ...watchlist]);
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
      const suggestion = unwrapActionResponse(result);

      setContacts(
        contacts.map((c) =>
          c.id === suggestion.receiverId
            ? {
                ...c,
                suggestionsFromUser: {
                  dbId: [...c.suggestionsFromUser.dbId, suggestion.mediaId],
                  tmdbId: [...c.suggestionsFromUser.tmdbId],
                },
              }
            : c
        )
      );
    } else {
      const result = await createCustomMedia(media);
      const newMedia = unwrapActionResponse(result);

      const newItem: MediaItem = {
        ...newMedia,
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
      const suggestion = unwrapActionResponse(result);

      setContacts(
        contacts.map((c) =>
          c.id === suggestion.receiverId
            ? {
                ...c,
                suggestionsFromUser: {
                  dbId: [...c.suggestionsFromUser.dbId, suggestion.mediaId],
                  tmdbId: [
                    ...c.suggestionsFromUser.tmdbId,
                    ...(suggestion.media.tmdbId
                      ? [suggestion.media.tmdbId]
                      : []),
                  ],
                },
              }
            : c
        )
      );
    } else {
      const result = await addExistantMediaToWatchlist(mediaId);
      const newMedia = unwrapActionResponse(result);

      setWatchlist([newMedia, ...watchlist]);
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
    const updatedMedia = unwrapActionResponse(result);

    setWatchlist(
      watchlist.map((media) =>
        media.id === updatedMedia.id ? { ...media, ...updatedMedia } : media
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
    const updatedMedia = unwrapActionResponse(result);

    setWatchlist(
      watchlist.map((media) =>
        media.id === updatedMedia.mediaId
          ? { ...media, watched: updatedMedia.watched }
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
    const deletedMedia = unwrapActionResponse(result);

    setWatchlist(
      watchlist.filter((media) => media.id !== deletedMedia.mediaId)
    );
  };

  const {
    run: deleteMedia,
    isLoading: isDeletingMedia,
    error: deleteError,
  } = useAsyncAction(deleteItem);

  return { deleteMedia, isDeletingMedia, deleteError };
};
