"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignIn from "./SignIn";

const SignInBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connexion</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
        </DialogHeader>
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

export default SignInBtn;
