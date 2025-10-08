import { Button, Loader } from "@/src/components/ui";
import { FriendRequestStatus, ValidateFriendRequestProps } from "@/src/types";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { useUpdateRequest } from "../../hooks/useSocialMutations";

const ValidateFriendRequest = ({
  requestId,
  senderId,
}: ValidateFriendRequestProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const { updateRequest, isUpdating, updateError } = useUpdateRequest();

  const handleRespondToFriendRequest = async (status: FriendRequestStatus) => {
    const success = await updateRequest(requestId, status);
    if (success) {
      if (status === "ACCEPTED") {
        setAdded(true);
      } else {
        setDeleted(true);
      }
    }
  };

  if (added) {
    return (
      <div className="flex gap-2  items-center">
        <FaCheckCircle className="text-2xl text-zinc-500 bg-zinc-800 text-center my-2" />
        <Button variant="outline">
          <Link href={`/user/${senderId}`}>Profil</Link>
        </Button>
      </div>
    );
  }

  if (deleted) {
    return <RxCross1 className="text-2xl" />;
  }

  return (
    <div className="flex gap-8 items-center">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => {
            handleRespondToFriendRequest("ACCEPTED");
          }}
        >
          <FaCheck />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            handleRespondToFriendRequest("REFUSED");
          }}
        >
          <ImCross />
        </Button>
      </div>
      {isUpdating && <Loader />}
      {updateError && <p className="error-message">{updateError}</p>}
    </div>
  );
};

export default ValidateFriendRequest;
