"use client";
import { Loader } from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const userId = session?.user.id;

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

  const sendRequest = async (id: string) => {
    try {
      const response = await fetch("/api/social/send", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
          result?.map((result, index) => (
            <Card className="p-4 mx-auto" key={index}>
              <CardHeader>
                <CardTitle className="text-center">{result.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={result.avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                {userId == result.id ? null : (
                  <Button
                    variant="outline"
                    onClick={() => sendRequest(result.id)}
                  >
                    Ajouter
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
