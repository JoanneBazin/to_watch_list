"use client";
import { Logo } from "@/src/components/ui/Logo";
import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  console.log(session);

  const [categ, setCateg] = useState("");

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categ }),
      });
      if (!response.ok) {
        console.log("oups");
      }
      console.log("Categ crée");
      setCateg("");
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="mx-12">
        <h2>Ajout catégorie</h2>
        <input
          type="text"
          value={categ}
          onChange={(e) => setCateg(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </main>
  );
}
