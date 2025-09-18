"use client";
import AuthForm from "@/components/actions/auth/AuthForm";
import SignInBtn from "@/components/actions/auth/SignInBtn";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-around  h-full my-10">
        <div className="flex flex-col gap-3">
          <AuthForm />
        </div>

        <Logo />
      </div>
    </>
  );
}
