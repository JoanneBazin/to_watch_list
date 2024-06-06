"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUp from "./SignUp";

const SignUpBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-4">Inscription</Button>
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
