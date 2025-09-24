"use client";

import { useEffect, useState } from "react";
import { SuggestionsListProps } from "@/src/lib/types";
import SuggestionResponse from "./SuggestionResponse";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Loader,
} from "@/src/components/ui";

const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState<SuggestionsListProps[]>([]);
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
          {suggestions.map((suggestion) => (
            <Card key={suggestion.media.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{suggestion.media.title}</span>

                  <Badge>{suggestion.media.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {suggestion.suggestions.map((suggest) => (
                  <div key={suggest.id} className="my-4">
                    <div className="flex gap-3">
                      <Avatar
                        size="small"
                        img={`data:image/*;base64,${suggest.sender.image}`}
                      />
                      <p>envoyé par {suggest.sender.name}</p>
                    </div>
                    <p className="italic mt-2">{suggest.senderComment}</p>
                  </div>
                ))}

                <SuggestionResponse mediaId={suggestion.media.id} />
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
