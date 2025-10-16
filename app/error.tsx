"use client";

import { Button } from "@/src/components/ui";
import Link from "next/link";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-around bg-black overflow-hidden text-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[120vw] h-[120vh] blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 50%, rgba(255,215,128,0.15), transparent 70%)",
          }}
        ></div>
      </div>
      <div className="z-50">
        <h1 className="text-5xl sm:text-[10rem] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#310704] to-[#ca251c]">
          Oups...
        </h1>
        <p className="text-accent-foreground text-lg sm:text-xl my-8">
          Une erreur est survenue
        </p>
        <Button variant="outline" onClick={() => reset()}>
          Recharger la page
        </Button>
      </div>

      <div className="z-50">
        <Link
          href="/"
          className="border border-[#7c0902] text-[#7c0902] hover:text-accent hover:border-accent rounded-sm py-2 px-3"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
};

export default Error;
