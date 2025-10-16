import Image from "next/image";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";

export default function WatchPage({ params }: { params: { id: string } }) {
  const related = Array.from({ length: 8 }).map((_, i) => ({
    id: `${params.id}-${i}`,
    title: `Related: Courtyard Light ${i + 1}`,
    channel: "Alhambra Arts",
    views: `${(i + 1) * 4}k views`,
    date: "5 days ago",
    thumbnailUrl: `https://images.unsplash.com/photo-1517518295033-4eec5e9a3c8a?q=80&w=1200&auto=format&fit=crop`,
  }));

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-4">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
          <Image src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop" alt="video" fill className="object-cover" />
        </div>
        <h1 className="text-xl font-semibold">Courtyard Geometry and Light</h1>
        <div className="text-sm text-white/60">24,102 views • 2 weeks ago</div>

        <div className="flex items-center justify-between py-3 border-y border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-accent" />
            </div>
            <div>
              <Link href="/channel/almimar" className="font-medium hover:underline">Al-Mi'mar</Link>
              <div className="text-xs text-white/60">128k subscribers</div>
            </div>
          </div>
          <button className="h-10 px-4 rounded-full bg-accent text-black font-medium">Subscribe</button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Like</button>
            <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Dislike</button>
            <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Share</button>
          </div>

          <details className="rounded-lg bg-muted/60 border border-white/10 p-3">
            <summary className="cursor-pointer font-medium">Description</summary>
            <p className="mt-2 text-sm text-white/80">A deep dive into arch forms, muqarnas, and the play of sunlight in traditional courtyards.</p>
          </details>

          <div className="space-y-3">
            <h2 className="font-medium">Comments</h2>
            <div className="flex gap-2">
              <input className="flex-1 h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="Add a comment" />
              <button className="h-10 px-4 rounded-lg bg-accent text-black">Comment</button>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10" />
                  <div>
                    <div className="text-sm font-medium">Viewer {i + 1}</div>
                    <div className="text-sm text-white/80">Stunning patterns and calming ambience.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-3">
        <h3 className="font-medium">Up Next</h3>
        <div className="grid gap-3">
          {related.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
      </aside>
    </div>
  );
}


