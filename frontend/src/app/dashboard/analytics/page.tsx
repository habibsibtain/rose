export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>

      <div className="flex items-center gap-3">
        <div className="text-sm text-white/70">Date Range</div>
        <select className="h-9 rounded-lg bg-background/70 border border-white/10 px-3">
          <option>Last 7 days</option>
          <option>Last 28 days</option>
          <option>Last 90 days</option>
          <option>Lifetime</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <MetricCard title="Views" value="42,410" />
        <MetricCard title="Watch Time (hrs)" value="1,284" />
        <MetricCard title="Subscribers" value="+612" />
      </div>

      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
        <div className="font-medium mb-2">Performance</div>
        <div className="h-56 rounded-lg bg-white/5" />
      </div>

      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
        <div className="font-medium mb-3">Top Videos</div>
        <ul className="text-sm text-white/80 space-y-2">
          <li className="flex justify-between"><span>Courtyard Geometry</span><span>8.2k</span></li>
          <li className="flex justify-between"><span>Muqarnas Explained</span><span>6.9k</span></li>
          <li className="flex justify-between"><span>Light & Shadow</span><span>5.1k</span></li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="font-medium mb-2">Audience Demographics</div>
          <div className="h-40 rounded-lg bg-white/5" />
        </div>
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="font-medium mb-2">Viewer Loyalty</div>
          <div className="h-40 rounded-lg bg-white/5" />
        </div>
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="font-medium mb-2">Subscriber Watch Time</div>
          <div className="h-40 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
      <div className="text-sm text-white/70">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/60">for selected period</div>
    </div>
  );
}


