import { useState } from "react";
import { signUp } from "@/src/lib/auth-client";
import { SignUpData, signUpSchema } from "../auth.schema";
import { validate } from "@/src/utils/validateSchema";
import { handleError } from "@/src/utils/errorHandlers";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignUp = async (user: SignUpData) => {
    setIsLoading(true);
    setAuthError(null);
    setValidationErrors({});

    const result = validate(signUpSchema, user);
    if (!result.success) {
      setValidationErrors({
        email: result.errors?.email?.[0],
        password: result.errors?.password?.[0],
        name: result.errors?.name?.[0],
      });
      setIsLoading(false);
      return;
    }

    try {
      await signUp.email(
        {
          name: user.name,
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

  return { handleSignUp, isLoading, authError, validationErrors };
};
