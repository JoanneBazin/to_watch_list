import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DebugSession() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session data : ", session);
    console.log("Session status : ", status);
  }, [session, status]);

  return null;
}
