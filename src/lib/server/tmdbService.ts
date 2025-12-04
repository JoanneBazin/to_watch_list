"use server";

import {
  MOCK_TMDB_FILM,
  MOCK_TMDB_MEDIA_RESULTS,
  MOCK_TMDB_SERIE,
} from "@/src/mocks/tmdb";
import { EntryType, TMDBMedia, TMDBSerie } from "@/src/types";
import { ApiError } from "@/src/utils/shared";

export const fetchMediaQuery = async (
  query: string,
  entry: EntryType
): Promise<TMDBMedia[]> => {
  if (process.env.NODE_ENV === "test" || process.env.USE_MOCK_TMDB === "true") {
    return MOCK_TMDB_MEDIA_RESULTS;
  }

  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&language=fr-FR`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }

  const result = await response.json();

  if (entry === "SERIE") {
    const resultList: TMDBSerie[] = result.results;
    return resultList.map((s) => ({
      id: s.id,
      title: s.name,
      original_title: s.original_name,
      overview: s.overview,
      release_date: s.first_air_date,
      poster_path: s.poster_path,
    }));
  }
  return result.results;
};

export const fetchMediaFromTMDB = async (mediaId: number, entry: EntryType) => {
  if (process.env.NODE_ENV === "test" || process.env.USE_MOCK_TMDB === "true") {
    return entry === "FILM"
      ? MOCK_TMDB_FILM(mediaId)
      : MOCK_TMDB_SERIE(mediaId);
  }
  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits,watch/providers&language=fr-FR`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Erreur lors de la récupération TMDB");
  }

  return response.json();
};
