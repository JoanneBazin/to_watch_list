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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!isLogin && (
        <div>
          <label htmlFor="name" className="sr-only">
            Nom
          </label>
          <Input
            type="text"
            id="name"
            placeholder="Nom"
            data-testid="name-input"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {validationErrors.name && (
            <p className="error-message mt-2">{validationErrors.name}</p>
          )}
        </div>
      )}
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <Input
          type="text"
          id="email"
          placeholder="Email"
          data-testid="email-input"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {validationErrors.email && (
          <p className="error-message mt-2">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Mot de passe
        </label>

        <Input
          type="password"
          id="password"
          placeholder="Mot de passe"
          data-testid="password-input"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {validationErrors.password && (
          <p className="error-message mt-2">{validationErrors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-3 w-2/3 md:w-1/2 self-center"
        data-testid="auth-submit"
      >
        {isLoading ? (
          <Loader size="small" />
        ) : isLogin ? (
          "Se connecter"
        ) : (
          "S'inscrire"
        )}
      </Button>

      {authError && (
        <p className="error-message text-center" data-testid="auth-error">
          {authError}
        </p>
      )}
    </form>
  );
};
