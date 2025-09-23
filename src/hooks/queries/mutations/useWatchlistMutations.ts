import {
  addToWatchlist,
  deleteFromWatchlist,
  updateWatched,
} from "@/src/features/media/media.actions";
import { useMediaStore } from "@/src/stores/mediaStore";
import { MediaItem } from "@/src/types";

export const useAddMedia = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const addFilm = async (media: MediaItem) => {
    try {
      const newFilm = await addToWatchlist(media);
      const validFilm: MediaItem = {
        ...newFilm,
        addedAt: (newFilm as MediaItem).addedAt ?? new Date().toISOString(),
        watched: (newFilm as MediaItem).watched ?? false,
      };
      setFilms([...films, validFilm]);
    } catch (error) {
      return error;
    }
  };

  const addSerie = async (media: MediaItem) => {
    try {
      const newSerie = await addToWatchlist(media);
      const validSerie: MediaItem = {
        ...newSerie,
        addedAt: (newSerie as MediaItem).addedAt ?? new Date().toISOString(),
        watched: (newSerie as MediaItem).watched ?? false,
      };
      setSeries([...series, validSerie]);
    } catch (error) {
      return error;
    }
  };

  return { addFilm, addSerie };
};

export const useToggleWatched = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const updateFilmWatched = async (filmId: string) => {
    try {
      await updateWatched(filmId);
      setFilms(
        films.map((film) =>
          film.id === filmId ? { ...film, watched: !film.watched } : film
        )
      );
    } catch (error) {
      return error;
    }
  };
  const updateSerieWatched = async (serieId: string) => {
    try {
      await updateWatched(serieId);
      setSeries(
        series.map((serie) =>
          serie.id === serieId ? { ...serie, watched: !serie.watched } : serie
        )
      );
    } catch (error) {
      return error;
    }
  };

  return { updateFilmWatched, updateSerieWatched };
};

export const useDeleteFromWatchlist = () => {
  const { films, series, setFilms, setSeries } = useMediaStore.getState();

  const deleteFilm = async (filmId: string) => {
    try {
      await deleteFromWatchlist(filmId);
      setFilms(films.filter((film) => film.id !== filmId));
    } catch (error) {
      return error;
    }
  };

  const deleteSerie = async (serieId: string) => {
    try {
      await deleteFromWatchlist(serieId);
      setSeries(series.filter((serie) => serie.id !== serieId));
    } catch (error) {
      return error;
    }
  };

  return { deleteFilm, deleteSerie };
};
