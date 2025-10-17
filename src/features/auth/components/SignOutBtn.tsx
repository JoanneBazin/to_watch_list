"use client";
import { Button } from "@/src/components/ui";
import { handleSignOut } from "@/src/utils/client";

export const SignOutBtn = () => {
  return (
    <Button
      variant="outline"
      className=" px-2"
      onClick={handleSignOut}
      data-testid="signout-btn"
    >
      Déconnexion
    </Button>
  );
};
