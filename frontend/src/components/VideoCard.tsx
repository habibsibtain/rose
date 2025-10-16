import Image from "next/image";
import Link from "next/link";

export type VideoCardProps = {
  id: string;
  title: string;
  channel: string;
  views: string;
  date: string;
  thumbnailUrl: string;
};

export default function VideoCard({ id, title, channel, views, date, thumbnailUrl }: VideoCardProps) {
  return (
    <Link
      href={`/watch/${id}`}
      className="group block rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition bg-muted/50 focus-ring"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="text-[15px] font-medium line-clamp-2 group-hover:text-accent transition">{title}</h3>
        <div className="text-xs text-white/70">{channel}</div>
        <div className="text-xs text-white/50">{views} • {date}</div>
      </div>
    </Link>
  );
}


