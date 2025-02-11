"use client";
import WatchList from "@/app/components/WatchList";
import SignInBtn from "@/components/actions/auth/SignInBtn";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/UserContext";
import Link from "next/link";
import SuggestionsList from "./components/SuggestionsList";
import ReceivedMessages from "./components/ReceivedMessages";

export default function Home() {
  const { user, loading } = useUser();

  if (!user) {
    return (
      <>
        <div className="flex items-center justify-around  h-full my-10">
          <div className="flex flex-col gap-3">
            <Link href="/auth">
              <Button variant="outline">S&#39;inscrire</Button>
            </Link>
            <SignInBtn />
          </div>

          <Logo />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text-center text-3xl m-8">Watch List</h1>
        <WatchList />
      </div>

      <div>
        <h2 className="m-10 p-8 text-3xl border rounded-md">Suggestions</h2>
        <SuggestionsList />
      </div>
    </>
  );
}
