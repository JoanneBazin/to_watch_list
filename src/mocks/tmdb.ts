export const MOCK_TMDB_MEDIA_RESULTS = [
  {
    id: 123,
    title: "TMDB Media 1",
    original_title: "TMDB Media",
    overview: "Synopsis mocké",
    poster_path: null,
    release_date: "2020-12-02",
  },
  {
    id: 456,
    title: "TMDB Media 2",
    original_title: "TMDB Media",
    overview: "Synopsis mocké",
    poster_path: null,
    release_date: "2020-12-02",
  },
];

export const MOCK_TMDB_FILM = (id: number) => ({
  id,
  title: "TMDB Media 1",
  original_title: "TMDB Film",
  overview: "Synopsis mocké",
  release_date: "2020-12-02",
  genres: [
    {
      id: 123,
      name: "Horreur",
    },
  ],
  credits: {
    cast: [{ name: "Film director", job: "Director" }],
    crew: [],
  },
  "watch/providers": {
    results: {
      FR: { flatrate: [{ provider_name: "Netflix" }] },
    },
  },
});

export const MOCK_TMDB_SERIE = (id: number) => ({
  id,
  name: "TMDB Media 1",
  original_name: "TMDB Serie",
  overview: "Synopsis mocké",
  first_air_date: "2020-12-02",
  genres: [
    {
      id: 123,
      name: "Horreur",
    },
  ],
  created_by: [{ id: 125, name: "TV Creator" }],
  "watch/providers": {
    results: {
      FR: { flatrate: [{ provider_name: "Netflix" }] },
    },
  },
});
