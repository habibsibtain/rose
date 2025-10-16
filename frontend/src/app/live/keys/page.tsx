export default function LiveKeysPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-semibold">Live Stream Details</h1>
      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50 space-y-4">
        <div className="space-y-1">
          <div className="text-sm text-white/70">RTMP URL</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-lg bg-background/70 border border-white/10">rtmp://live.nurstream.com/live</code>
            <button className="h-10 px-3 rounded-lg border border-white/15 hover:bg-white/5">Copy</button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-white/70">Stream Key</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-lg bg-background/70 border border-white/10">sk_live_•••••••••••••••</code>
            <button className="h-10 px-3 rounded-lg border border-white/15 hover:bg-white/5">Reveal</button>
            <button className="h-10 px-3 rounded-lg border border-white/15 hover:bg-white/5">Copy</button>
          </div>
        </div>
        <div className="text-sm text-white/70">
          Copy and paste these into your streaming software (e.g., OBS) to start your broadcast.
        </div>
      </div>
    </div>
  );
}
