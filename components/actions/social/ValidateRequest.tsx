import { Button } from "@/components/ui/button";
import { FriendsProps, SenderRequestsProps } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

interface RequestIdProps {
  requestId: SenderRequestsProps["id"];
  senderId: FriendsProps["id"];
}

const ValidateRequest = ({ requestId, senderId }: RequestIdProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const handleAcceptRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/social/requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      setLoading(false);
      setAdded(true);
    } catch (error) {
      console.log(error);
      setAdded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/social/requests/${requestId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("HTTP error");
      }

      setLoading(false);
      setDeleted(true);
    } catch (error) {
      console.log(error);
      setDeleted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {added ? (
        <div className="flex gap-2  items-center">
          <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800 text-center my-2" />
          <Button variant="outline">
            <Link href={`/communauty/${senderId}`}>Profil</Link>
          </Button>
        </div>
      ) : deleted ? (
        <RxCross1 className="text-2xl" />
      ) : loading ? (
        <Button>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button
            onClick={() => {
              handleAcceptRequest();
            }}
          >
            <FaCheck />
          </Button>
          <Button
            onClick={() => {
              handleDeleteRequest();
            }}
          >
            <ImCross />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ValidateRequest;
