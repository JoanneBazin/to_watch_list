import { useState } from "react";
import { SignInData, signInSchema } from "../auth.schema";
import { handleError, safeValidateSchema } from "@/src/utils/client";
import { signIn } from "@/src/lib/client";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async (user: SignInData) => {
    setIsLoading(true);
    setAuthError(null);
    setValidationErrors({});

    const result = safeValidateSchema(signInSchema, user);
    if (!result.success) {
      setValidationErrors({
        email: result.errors?.email?.[0],
        password: result.errors?.password?.[0],
      });
      setIsLoading(false);
      return;
    }

    try {
      await signIn.email(
        {
          email: user.email,
          password: user.password,
        },
        {
          onError: (ctx) => {
            setAuthError(ctx.error.message);
          },
        }
      );
    } catch (error) {
      handleError(error, setAuthError);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn, isLoading, authError, validationErrors };
};
