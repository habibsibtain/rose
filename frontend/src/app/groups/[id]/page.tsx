import Link from "next/link";
import VideoCard from "@/components/VideoCard";

export default function GroupHubPage({ params }: { params: { id: string } }) {
  const isAdmin = Number(params.id) % 2 === 1;
  const code = "ABCD-1234";
  const content = Array.from({ length: 6 }).map((_, i) => ({
    id: `${params.id}-${i}`,
    title: `Private Upload ${i + 1}`,
    channel: "Group Members",
    views: `${(i + 1) * 2} views`,
    date: "today",
    thumbnailUrl: `https://images.unsplash.com/photo-1520697222862-790a1f685b02?q=80&w=1200&auto=format&fit=crop`,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-accent/20 to-accent-2/20" />
        <div className="p-4 flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Architecture Circle {params.id}</h1>
            <div className="text-sm text-white/70">Private Group</div>
          </div>
          <div className="ml-auto flex gap-2">
            <Link href="/live/setup?group=1" className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Go Live</Link>
            {isAdmin && (
              <>
                <Link href="/upload" className="h-10 px-4 rounded-lg bg-accent text-black">Upload Content</Link>
                <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Manage Members</button>
              </>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-white/10 p-3 bg-white/5 flex items-center justify-between">
              <div>
                <div className="text-sm text-white/70">Joining Code</div>
                <div className="font-mono">{code}</div>
              </div>
              <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Copy Code</button>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.length === 0 ? (
          <div className="text-white/70">No content yet.</div>
        ) : (
          content.map((v) => <VideoCard key={v.id} {...v} />)
        )}
      </div>
    </div>
  );
}


