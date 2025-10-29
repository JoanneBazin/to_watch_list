import { MediaFormData } from "@/src/features/media/media.schema";
import { EntryType, TMDBMedia, TMDBMediaDetails, TMDBSerie } from "@/src/types";
import { ApiError } from "../shared";

function isFilm(media: TMDBMedia | TMDBSerie): media is TMDBMedia {
  return (media as TMDBMedia).title !== undefined;
}
function isSerie(media: TMDBMedia | TMDBSerie): media is TMDBSerie {
  return (media as TMDBSerie).name !== undefined;
}

export const getMediaDBFormat = <T extends EntryType>(
  media: TMDBMediaDetails<T extends "FILM" ? TMDBMedia : TMDBSerie>,
  entry: T
): MediaFormData => {
  const platform = media["watch/providers"]?.results?.FR?.flatrate
    ?.map((d) => d.provider_name)
    .join(", ");
  const categories = media.genres.map((g) => g.name);
  const { id: tmdbId, overview: synopsis } = media;

  if (entry === "SERIE" && isSerie(media)) {
    const real = media.created_by?.map((d) => d.name).join(", ");
    return {
      title: media.name,
      originalTitle: media.original_name,
      tmdbId,
      synopsis,
      year: media.first_air_date.slice(0, 4),
      real: real ?? null,
      platform: platform ?? null,
      categories,
      type: entry,
    };
  }

  if (entry === "FILM" && isFilm(media)) {
    const real = media.credits?.crew
      .filter((p) => p.job === "Director")
      .map((d) => d.name)
      .join(", ");

    return {
      title: media.title,
      originalTitle: media.original_title,
      tmdbId,
      synopsis,
      year: media.release_date.slice(0, 4),
      real: real ?? null,
      platform: platform ?? null,
      categories,
      type: entry,
    };
  }
  throw new ApiError(400, "Type de média invalide");
};
