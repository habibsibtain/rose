export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Creator Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Views" value="42,410" subtitle="Last 28 days" />
        <StatCard title="Watch Time (hrs)" value="1,284" subtitle="Last 28 days" />
        <StatCard title="Subscribers" value="+612" subtitle="Last 28 days" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="font-medium mb-2">Latest Video Performance</div>
          <div className="text-sm text-white/70">Views, Comments, Likes snapshot</div>
          <div className="h-36 mt-3 rounded-lg bg-white/5" />
        </div>
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="font-medium mb-2">Recent Activity</div>
          <ul className="text-sm text-white/80 space-y-2">
            <li>New subscriber: Layla</li>
            <li>New comment on Courtyard Geometry</li>
            <li>New subscriber: Omar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
      <div className="text-sm text-white/70">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/60">{subtitle}</div>
    </div>
  );
}


