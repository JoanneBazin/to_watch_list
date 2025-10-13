"use client";
import AuthForm from "@/src/features/auth/components/AuthForm";
import { useSession } from "@/src/lib/auth-client";
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
    <main className="flex flex-col gap-8 items-center my-12">
      <h1 className="text-2xl font-semibold">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      <AuthForm isLogin={isLogin} />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "Déjà un compte ?"}
      </button>
    </main>
  );
};

export default Authentification;
