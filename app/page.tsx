"use client";
import SignInBtn from "@/components/actions/auth/SignInBtn";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }

    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [status, router, session]);

  return (
    <>
      <div className="flex items-center justify-around  h-full my-10">
        <div className="flex flex-col gap-3">
          <Link href="/auth">
            <Button variant="outline">S&#39;inscrire</Button>
          </Link>
          <SignInBtn />
        </div>

        <Logo />
      </div>
    </>
  );
}
