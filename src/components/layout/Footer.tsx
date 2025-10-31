"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-1 items-end p-6">
      <Link href="/about" className="underline">
        A propos
      </Link>
    </footer>
  );
};
