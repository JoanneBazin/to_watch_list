"use client";
import { Footer } from "@/src/components/layout";
import { Loader, Logo } from "@/src/components/ui";
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

  if (isPending || session) {
    return <Loader size="large" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
          <div className="flex flex-col items-center text-center gap-8">
            <Logo size="large" img="/watchers_logo.svg" alt="Logo Watchers" />

            <div className="max-w-3xl space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ne perdez plus jamais une série à regarder.
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="
          inline-flex items-center justify-center gap-2
          rounded-lg
          bg-primary
          px-6 py-3
          font-medium
          text-white
          transition-colors
          hover:bg-primary-hover
        "
              >
                Commencer
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold mb-3">Organisez votre watchlist</h2>

              <p className="text-sm text-muted">
                Regroupez tous vos films et séries dans une seule liste, sans
                notes dispersées ni captures d'écran oubliées.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold mb-3">
                Partagez vos recommandations
              </h2>

              <p className="text-sm text-muted">
                Envoyez facilement des films et séries à vos contacts et
                découvrez ce que vos proches regardent pour enrichir votre
                propre liste.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold mb-3">Retrouvez vos envies</h2>

              <p className="text-sm text-muted">
                Ajoutez rapidement un contenu découvert sur les réseaux, entre
                amis ou sur une plateforme de streaming.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
