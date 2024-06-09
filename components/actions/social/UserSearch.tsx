"use client";
import { Loader } from "@/components/layout/Loader";
import UserCard from "@/components/layout/UserCard";

import { Input } from "@/components/ui/input";
import { UserProps } from "@/lib/types";
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
    <div>
      <div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher par nom"
        />
      </div>

      <div className=" grid grid-cols-3 gap-4 m-6">
        {loading ? (
          <Loader />
        ) : result ? (
          result?.map((result) => (
            <UserCard
              key={result.id}
              id={result.id}
              name={result.name}
              avatar={result.avatar}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
