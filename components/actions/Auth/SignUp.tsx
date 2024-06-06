"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpForm>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const result = await signIn("credentials", {
          callbackUrl: "/",
          redirect: true,
          email,
          password,
        });

        if (result?.error) {
          setError("Problème de connexion");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Unexpected error occured");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="col-span-3"
              required
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              className="col-span-3"
              type="email"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
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
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <Button type="submit">Créer un compte</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
