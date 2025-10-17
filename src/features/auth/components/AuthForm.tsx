"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "../hooks";
import { Button, Input, Loader } from "@/src/components/ui";

export const AuthForm = ({ isLogin = true }: { isLogin: boolean }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    handleSignIn,
    isLoading: signInLoading,
    authError: signInAuthError,
    validationErrors: signInValidationErrors,
  } = useSignIn();
  const {
    handleSignUp,
    isLoading: signUpLoading,
    authError: signUpAuthError,
    validationErrors: signUpValidationErrors,
  } = useSignUp();

  const validationErrors = isLogin
    ? signInValidationErrors
    : signUpValidationErrors;
  const authError = signInAuthError || signUpAuthError;
  const isLoading = signInLoading || signUpLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await handleSignIn(user);
    } else {
      await handleSignUp(user);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-1/3 flex flex-col gap-4">
      {!isLogin && (
        <div>
          <Input
            type="text"
            placeholder="Nom"
            data-testid="name-input"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {validationErrors.name && (
            <p className="error-message mt-1">{validationErrors.name}</p>
          )}
        </div>
      )}
      <div>
        <Input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {validationErrors.email && (
          <p className="error-message mt-1">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Mot de passe"
          data-testid="password-input"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {validationErrors.password && (
          <p className="error-message mt-1">{validationErrors.password}</p>
        )}
      </div>

      <Button type="submit" className="mt-3" data-testid="auth-submit">
        {isLoading ? <Loader /> : isLogin ? "Se connecter" : "S'inscrire"}
      </Button>

      {authError && (
        <p className="error-message text-center" data-testid="auth-error">
          {authError}
        </p>
      )}
    </form>
  );
};
