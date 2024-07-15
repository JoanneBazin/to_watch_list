"use client";

import { useEffect, useState } from "react";
import { SuggestionsProps } from "@/lib/types";
import { Loader } from "./layout/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import SuggestionResponse from "./actions/suggestions/SuggestionResponse";
import { Badge } from "./ui/badge";

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
      ) : suggestions.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mx-4 my-10">
          {suggestions.map((suggest) => (
            <Card key={suggest.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{suggest.media.title}</span>

                  <Badge>{suggest.media.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>envoyé par {suggest.sender.name}</p>
                <p className="italic mt-2">{suggest.senderComment}</p>
                <SuggestionResponse suggestId={suggest.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="italic my-6">Pas de suggestions</div>
      )}
    </div>
  );
};

export default SuggestionsList;
