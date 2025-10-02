"use client";
import { Input, Loader } from "@/src/components/ui";
import { useEffect, useState } from "react";
import { fetchUserSearch } from "../social.api";
import { SearchContact } from "@/src/types";
import { UserCard } from "./UserCard";
import { handleError } from "@/src/utils/errorHandlers";

const UserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<SearchContact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const fetchResult = async () => {
      setLoading(true);
      setError(null);

      try {
        const users = await fetchUserSearch(query);
        setResult(users);
      } catch (error) {
        handleError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchResult, 800);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div className="m-4">
      <h2 className="m-6 text-2xl font-semibold">Rechercher</h2>
      <div className="m-6">
        <Input
          className="w-2/3"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un contact"
        />
      </div>

      <div className=" grid grid-cols-2 gap-4 m-6">
        {loading ? (
          <Loader />
        ) : result.length > 0 ? (
          result?.map((result) => <UserCard key={result.id} user={result} />)
        ) : query && result.length < 1 ? (
          <p className="italic">Pas de résultats</p>
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
