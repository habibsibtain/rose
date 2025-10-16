import Link from "next/link";

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Private Groups</h1>
        <div className="flex gap-2">
          <Link href="/groups/create" className="h-10 px-4 rounded-lg bg-accent text-black">Create a New Group</Link>
          <Link href="/groups/join" className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Join a Group</Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Link key={i} href={`/groups/${i + 1}`} className="block rounded-xl border border-white/10 p-4 bg-muted/50 hover:border-white/20">
            <div className="font-medium">Architecture Circle {i + 1}</div>
            <div className="text-sm text-white/70">12 members</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


