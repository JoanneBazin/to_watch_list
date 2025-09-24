"use client";
import { Loader, UserCard, Input } from "@/src/components/ui";
import { UserProps } from "@/src/lib/types";
import React, { useEffect, useState } from "react";

const UserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const fetchResult = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/search/${query}`);
        const users = await response.json();
        setResult(users);
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
          result?.map((result) => (
            <UserCard
              key={result.id}
              id={result.id}
              name={result.name}
              image={result.image}
            />
          ))
        ) : query && result.length < 1 ? (
          <p className="italic">Pas de résultats</p>
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
