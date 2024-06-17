"use client";

import { useEffect, useState } from "react";
import { SuggestionsProps } from "@/lib/types";
import { Loader } from "./layout/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import SuggestionResponse from "./actions/suggestions/SuggestionResponse";

const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState<SuggestionsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/api/suggestions");

        if (!response.ok) {
          throw new Error("HTTP error");
        }

        const result = await response.json();
        setSuggestions(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : suggestions ? (
        <div className="grid grid-cols-2 gap-4 m-4">
          {suggestions.map((suggest) => (
            <Card key={suggest.id}>
              <CardHeader>
                <CardTitle>{suggest.media.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>envoyé par {suggest.sender.name}</p>
                <p className="italic mt-2">{suggest.senderComment}</p>
                <SuggestionResponse />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="italic">Pas de suggestions</div>
      )}
    </div>
  );
};

export default SuggestionsList;
