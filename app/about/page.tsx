"use client";
import { Logo } from "@/src/components/ui";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();
  return (
    <main className="px-6 flex flex-col items-center">
      <h1 className="text-center text-lg lg:text-2xl my-8">A propos</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        <Link
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo size="x-small" img="/tmdb_logo.svg" alt="Logo TMDB" />
        </Link>
        <div className="flex flex-col gap-4">
          <div className="text-sm sm:text-base">
            <p>
              Les données de films et séries sont fournies par{" "}
              <Link
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                TMDB
              </Link>
              .
            </p>
            <p>
              Disponibilité des plateformes de streaming fournie par{" "}
              <Link
                href="https://www.justwatch.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                JustWatch
              </Link>
              .
            </p>
          </div>
          <div className="text-sm sm:text-base italic">
            <p>
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
            <p>Streaming availability data powered by JustWatch.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-8"></div>

      <button
        onClick={() => router.back()}
        className="flex justify-center items-center gap-3 text-sm my-4"
        aria-label="Retour à la page précédente"
      >
        <MoveLeft size={28} />
        Retour
      </button>
    </main>
  );
};

export default AboutPage;
