"use client";
import { Logo } from "@/src/components/ui/Logo";
import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (session && !isPending) {
      router.replace("/dashboard");
    }
  }, [router, session, isPending]);

  return (
    <main>
      <div className="flex items-center justify-around  h-full my-10">
        <Logo />
        <div className="flex flex-col gap-3">
          <Link href="/auth">Connexion</Link>
        </div>
      </div>
    </main>
  );
}
