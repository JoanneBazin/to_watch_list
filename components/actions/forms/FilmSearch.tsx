"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const FilmSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const URL_API = "http://www.omdbapi.com/?apikey=ee545ee4";

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const fetchResult = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${URL_API}&s=${query}`);
        const search = await response.json();
        setResult(search);
        console.log(search);
      } catch (error) {
        console.log("Error searching user", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchResult, 800);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div>
      <h3>Trouver un film</h3>

      <Input
        className="w-2/3"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film"
      />
    </div>
  );
};

export default FilmSearch;
