"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuthed = pathname?.startsWith("/home") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/upload") || pathname?.startsWith("/groups");

  if (isDashboard) {
    return (
      <div className="w-full px-3 sm:px-4 lg:px-4 py-6">
        <main className="min-w-0 w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] w-full px-4 sm:px-6 lg:px-6 gap-4 py-6">
      <aside className="hidden lg:block">
        <div className="sticky top-[88px] space-y-2">
          <SidebarLink href="/" label="Home" />
          <SidebarLink href="/trending" label="Trending" />
          <SidebarLink href="/music" label="Music" />
          <SidebarLink href="/gaming" label="Gaming" />
          {isAuthed && (
            <>
              <div className="h-px bg-white/10 my-2" />
              <SidebarLink href="/groups" label="My Groups" />
            </>
          )}
        </div>
      </aside>
      <main className="min-w-0 max-w-7xl w-full">{children}</main>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition focus-ring"
    >
      {label}
    </Link>
  );
}


