"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <Button
      className="mx-4"
      onClick={() => signOut({ callbackUrl: "/", redirect: true })}
    >
      Déconnexion
    </Button>
  );
};

export default SignOutBtn;
