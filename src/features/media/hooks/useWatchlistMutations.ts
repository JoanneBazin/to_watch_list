import {
  addToWatchlist,
  deleteFromWatchlist,
  updateMedia,
  updateWatched,
} from "@/src/features/media/media.actions";
import { EntryType, MediaItem } from "@/src/types";
import { handleActionError } from "@/src/utils/handleActionError";
import { useMediaStore } from "../media.store";

export const useAddMedia = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const addNewItem = async (media: MediaItem, type: EntryType) => {
    try {
      const result = await addToWatchlist(media);
      const newItem: MediaItem = {
        ...result,
        addedAt: (result as MediaItem).addedAt ?? new Date().toISOString(),
        watched: (result as MediaItem).watched ?? false,
      };

      if (type === "FILM") {
        setFilms([...films, newItem]);
      } else {
        setSeries([...series, newItem]);
      }
    } catch (error) {
      handleActionError(error, "AddMedia");
    }
  };

  return { addNewItem };
};

export const useUpdateMedia = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const updateItem = async (id: string, data: MediaItem, type: EntryType) => {
    try {
      const result = await updateMedia(id, data);

      if (type === "FILM") {
        setFilms(
          films.map((film) =>
            film.id === result.id ? { ...film, ...result } : film
          )
        );
      } else {
        setSeries(
          series.map((serie) =>
            serie.id === result.id ? { ...serie, ...result } : serie
          )
        );
      }
    } catch (error) {
      handleActionError(error, "UpdateMedia");
    }
  };

  return { updateItem };
};

export const useToggleWatched = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const updateWatchedItem = async (id: string, type: EntryType) => {
    try {
      const result = await updateWatched(id);

      if (type === "FILM") {
        setFilms(
          films.map((film) =>
            film.id === result.mediaId
              ? { ...film, watched: result.watched }
              : film
          )
        );
      } else {
        setSeries(
          series.map((serie) =>
            serie.id === result.mediaId
              ? { ...serie, watched: result.watched }
              : serie
          )
        );
      }
    } catch (error) {
      handleActionError(error, "UpdateWatched");
    }
  };

  return { updateWatchedItem };
};

export const useDeleteFromWatchlist = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const deleteItem = async (id: string, type: EntryType) => {
    try {
      const result = await deleteFromWatchlist(id);

      if (type === "FILM") {
        setFilms(films.filter((film) => film.id !== result.mediaId));
      } else {
        setSeries(series.filter((serie) => serie.id !== result.mediaId));
      }
    } catch (error) {
      handleActionError(error, "DeleteMedia");
    }
  };

  return { deleteItem };
};
