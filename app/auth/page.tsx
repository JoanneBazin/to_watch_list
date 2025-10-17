"use client";
import { AuthForm } from "@/src/features/auth/components";
import { useSession } from "@/src/lib/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Authentification = () => {
  const { data: session, isPending } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.replace("/dashboard");
    }
  }, [router, session, isPending]);

  return (
    <main className="max-w-[500px]">
      <h1 className="text-xl sm:text-2xl font-semibold my-12 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>

      <div className="flex flex-col gap-6 sm:gap-8 items-center">
        <AuthForm isLogin={isLogin} />
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm sm:text-base text-foreground underline hover:text-accent"
          data-testid="toggle-auth-form"
        >
          {isLogin ? "Créer un compte" : "Déjà un compte ?"}
        </button>
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-4"></div>
      </div>
      <Link
        href="/"
        className="flex justify-center items-center gap-3 text-sm my-4"
      >
        <MoveLeft size={28} />
        Retour
      </Link>
    </main>
  );
};

export default Authentification;
