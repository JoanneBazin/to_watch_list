"use client";

import { useEffect, useState } from "react";
import { SuggestionsProps } from "@/lib/types";
import { Loader } from "./layout/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";

const ReceivedMessages = () => {
  const [messages, setMessages] = useState<SuggestionsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/suggestions/response");

        if (!response.ok) {
          throw new Error("HTTP error");
        }

        const result = await response.json();
        setMessages(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : messages ? (
        <div>
          <div className="grid grid-cols-2 gap-4 mx-4 my-10">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <CardTitle className="flex gap-4">
                    <span>{message.receiver.name}</span>
                    <span className="italic">{message.media.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex">
                  <RiSingleQuotesL />
                  <p>{message.receiverComment}</p>
                  <RiSingleQuotesR />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReceivedMessages;
