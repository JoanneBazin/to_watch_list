"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { signIn, signUp } from "@/src/lib/auth-client";

import { useState } from "react";

const AuthForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    await signUp.email(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      }
    );

    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    await signIn.email(
      {
        email: user.email,
        password: user.password,
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      }
    );
    setLoading(false);
  };

  return (
    <div>
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

      {!isLogin && (
        <Input
          type="text"
          placeholder="Nom"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      )}
      <Input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Mot de passe"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <Button onClick={isLogin ? handleSignIn : handleSignUp}>
        {isLogin ? "Se connecter" : "S'inscrire"}
      </Button>

      <button onClick={() => setIsLogin(!isLogin)}>
        {loading
          ? "Chargement"
          : isLogin
          ? "Créer un compte"
          : "Déjà un compte ?"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AuthForm;
