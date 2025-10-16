import VideoCard from "@/components/VideoCard";

const personalized = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  title: `Recommended: Serenity Courtyards ${i + 1}`,
  channel: "Your Subscriptions",
  views: `${(i + 2) * 2}k views`,
  date: "1 day ago",
  thumbnailUrl: `https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop`,
}));

export default function HomeAuthedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Home</h1>
        <div className="text-sm text-white/60">Personalized for you</div>
      </div>
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {personalized.map((v) => (
          <VideoCard key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}


