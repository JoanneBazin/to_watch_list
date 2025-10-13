import { useState } from "react";
import { signIn } from "@/src/lib/auth-client";
import { SignInData, signInSchema } from "../auth.schema";
import { handleError } from "@/src/utils/errorHandlers";
import { safeValidateSchema } from "@/src/utils/validateSchema";

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
