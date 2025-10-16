"use client";
import { Logo } from "@/src/components/ui";
import { useSession } from "@/src/lib/auth-client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.replace("/dashboard");
    }
  }, [router, session, isPending]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center py-10">
      <Logo />
      <div className="flex-1 flex justify-center items-center">
        <Link
          href="/auth"
          className="text-lg sm:text-xl flex gap-2 items-center"
        >
          <ChevronRight />
          Connexion
        </Link>
      </div>
    </main>
  );
}
