"use client";
import { Footer } from "@/src/components/layout";
import { Logo } from "@/src/components/ui";
import { useSession } from "@/src/lib/client";
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
    <div className="h-screen flex flex-col">
      <main className="flex flex-col items-center py-10 gap-16">
        <Logo size="large" img="/watchers_logo.svg" alt="Logo Watchers" />
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
      <Footer />
    </div>
  );
}
