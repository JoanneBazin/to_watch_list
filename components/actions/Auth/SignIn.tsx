"use client";

import { useUser } from "@/app/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { handleSubmit, register } = useForm<SignInForm>();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const { email, password } = data;

    try {
      const result = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Error network");
        }
        const userData = await response.json();

        setUser({
          name: userData.name,
          avatar: userData.avatar,
          id: userData.id,
          email: userData.email,
          isLoggedIn: true,
        });

        router.replace("/");
      }
      if (result?.error) {
        setError("Email ou mot de passe incorrect ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <Button className="my-4" type="submit">
          Se connecter
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;
