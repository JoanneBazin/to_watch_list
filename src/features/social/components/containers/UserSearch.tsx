"use client";
import { Input, Loader } from "@/src/components/ui";
import { useState } from "react";
import { UserCard } from "../ui/UserCard";
import { useFetchSearchedUser } from "../../hooks";

export const UserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const { users, isLoading, error } = useFetchSearchedUser(query);

  return (
    <section className="max-w-[768px] mx-auto">
      <h2 className="sr-only">Rechercher un contact</h2>
      <div className="mt-5 mb-3 sm:my-5">
        <Input
          className="w-3/4 sm:w-2/3"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un contact"
          data-testid="search-user-input"
        />
      </div>
      {isLoading && <Loader />}
      {error && <p className="ml-4 italic text-accent">{error}</p>}

      {!error && users.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 my-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
};
