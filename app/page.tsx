"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div>
      <div>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
        <div>Add Serie</div>
      </div>
    </div>
  );
}
