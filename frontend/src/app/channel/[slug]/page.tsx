import VideoCard from "@/components/VideoCard";

export default function ChannelPage({ params }: { params: { slug: string } }) {
  const uploads = Array.from({ length: 12 }).map((_, i) => ({
    id: `${params.slug}-${i}`,
    title: `Courtyard Reflections ${i + 1}`,
    channel: "Al-Mi'mar",
    views: `${(i + 1) * 5}k views`,
    date: "1 week ago",
    thumbnailUrl: `https://images.unsplash.com/photo-1523345863769-9b8a0b37b3a0?q=80&w=1200&auto=format&fit=crop`,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <div className="h-40 bg-gradient-to-r from-accent/30 to-accent-2/30" />
        <div className="p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Al-Mi'mar</h1>
            <div className="text-sm text-white/70">182k subscribers</div>
          </div>
          <div className="ml-auto">
            <button className="h-10 px-4 rounded-full bg-accent text-black font-medium">Subscribe</button>
          </div>
        </div>
        <div className="px-4 pb-4 border-t border-white/10">
          <nav className="flex gap-4 text-sm">
            <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">Videos</button>
            <button className="px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent">Live</button>
            <button className="px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent">About</button>
          </nav>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {uploads.map((v) => (
          <VideoCard key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}


