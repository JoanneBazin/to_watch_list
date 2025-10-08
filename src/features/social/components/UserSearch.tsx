"use client";
import { Input, Loader } from "@/src/components/ui";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { useFetchSearchedUser } from "../hooks/useFetchSearchedUser";

const UserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const { users, isLoading, error } = useFetchSearchedUser(query);

  return (
    <section className="m-4">
      <h2 className="sr-only">Rechercher un contact</h2>
      <div className="m-6">
        <Input
          className="w-2/3"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un contact"
        />
      </div>

      <div className="py-6">
        {isLoading && <Loader />}
        {error && <p className="ml-12 italic text-gray-500">{error}</p>}
        <div className=" grid grid-cols-2 gap-4 m-6">
          {!isLoading &&
            !error &&
            users.length > 0 &&
            users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
