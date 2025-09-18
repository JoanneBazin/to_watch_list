"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUp from "./AuthForm";

const SignUpBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-4">
          Inscription
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incription</DialogTitle>
        </DialogHeader>

        <SignUp />
      </DialogContent>
    </Dialog>
  );
};

export default SignUpBtn;
