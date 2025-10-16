export default function DashboardCommentsPage() {
  const comments = Array.from({ length: 5 }).map((_, i) => ({
    by: `User ${i + 1}`,
    text: "Beautiful craftsmanship and symmetry.",
    video: "Courtyard Geometry",
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Comments</h1>
      <div className="flex gap-2">
        <button className="h-9 px-3 rounded-lg bg-white/5 border border-white/10">Published</button>
        <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Held for Review</button>
      </div>

      <div className="space-y-3">
        {comments.map((c, i) => (
          <div key={i} className="rounded-xl border border-white/10 p-4 bg-muted/50 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="text-sm"><span className="font-medium">{c.by}</span> on <span className="text-white/80">{c.video}</span></div>
              <div className="text-sm text-white/80">{c.text}</div>
              <div className="flex gap-2 mt-2">
                <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Reply</button>
                <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Like</button>
                <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Remove</button>
                <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


