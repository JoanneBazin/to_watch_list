"use client";
import AuthForm from "@/app/auth/_components/AuthForm";
import { useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Authentification = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.replace("/dashboard");
    }
  }, [router, session, isPending]);

  return (
    <div className="rounded-md p-4 flex flex-col items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default Authentification;
