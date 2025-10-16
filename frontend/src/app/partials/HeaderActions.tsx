"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderActions() {
  const pathname = usePathname();
  const isAuthed = pathname?.startsWith("/home") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/upload") || pathname?.startsWith("/groups");

  if (!isAuthed) {
    return (
      <nav className="flex items-center gap-2">
        <Link href="/login" className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/15 hover:bg-white/5 transition focus-ring">Log In</Link>
        <Link href="/signup" className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-accent text-black font-medium hover:brightness-110 transition focus-ring">Sign Up</Link>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-3">
      <Link href="/upload" className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/15 hover:bg-white/5 transition">Upload</Link>
      <Link href="/dashboard" className="w-10 h-10 rounded-full bg-accent/20 border border-white/15 grid place-items-center">
        <span className="w-5 h-5 rounded-full bg-accent block" />
      </Link>
    </nav>
  );
}


