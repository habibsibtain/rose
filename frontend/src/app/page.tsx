import VideoCard from "@/components/VideoCard";

const mockVideos = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: "Exploring Andalusian Arches: A Visual Journey",
  channel: "Nur Studio",
  views: `${(i + 3) * 3}k views`,
  date: "2 days ago",
  thumbnailUrl: `https://images.unsplash.com/photo-1545259741-2ea3ebf61fa0?q=80&w=1200&auto=format&fit=crop`,
}));

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Trending</h1>
        <div className="text-sm text-white/60">Discover featured public videos</div>
      </div>
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockVideos.map((v) => (
          <VideoCard key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}
