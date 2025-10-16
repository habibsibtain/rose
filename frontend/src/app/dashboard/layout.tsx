import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-4">
      <aside className="hidden lg:block">
        <div className="sticky top-[88px] space-y-2">
          <DashLink href="/dashboard" label="Dashboard" />
          <DashLink href="/dashboard/content" label="Content" />
          <DashLink href="/dashboard/analytics" label="Analytics" />
          <DashLink href="/dashboard/comments" label="Comments" />
          <DashLink href="/dashboard/settings" label="Settings" />
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}

function DashLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
      {label}
    </Link>
  );
}


