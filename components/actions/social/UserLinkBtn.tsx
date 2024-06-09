"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface UserLinkProps {
  userId: string;
  selfId: string | undefined;
}

export const UserLinkBtn = ({ userId, selfId }: UserLinkProps) => {
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/social/requests/${userId}`);
        if (!response.ok) {
          throw new Error("Error network");
        }
        const result = await response.json();

        setRequest(result);
        console.log(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  if (!selfId || selfId === userId) {
    return null;
  }

  const sendRequest = async () => {
    try {
      const response = await fetch(`/api/social/sentRequest/${userId}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  if (request === null) {
    return (
      <Button variant="outline" onClick={() => sendRequest()}>
        Ajouter
      </Button>
    );
  }

  return <></>;
};
