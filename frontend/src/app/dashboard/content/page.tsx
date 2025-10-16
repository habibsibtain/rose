export default function DashboardContentPage() {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    title: `Courtyard Geometry ${i + 1}`,
    visibility: i % 2 === 0 ? "Public" : "Private",
    date: "Sep 12, 2025",
    views: (i + 1) * 320,
    comments: (i + 1) * 3,
    likes: (i + 1) * 10,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Content</h1>

      <div className="flex gap-2">
        <button className="h-9 px-3 rounded-lg bg-white/5 border border-white/10">All</button>
        <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Public</button>
        <button className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5">Private</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Comments</th>
              <th className="px-4 py-3">Likes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="px-4 py-3">{v.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs border ${v.visibility === "Public" ? "border-accent text-accent" : "border-white/30 text-white/70"}`}>
                    {v.visibility}
                  </span>
                </td>
                <td className="px-4 py-3">{v.date}</td>
                <td className="px-4 py-3">{v.views}</td>
                <td className="px-4 py-3">{v.comments}</td>
                <td className="px-4 py-3">{v.likes}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Edit</button>
                    <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Analytics</button>
                    <button className="h-8 px-2 rounded border border-white/15 hover:bg-white/5">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


