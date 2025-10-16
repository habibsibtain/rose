import Link from "next/link";

export default function LiveSetupPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Go Live</h1>
      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50 space-y-4">
        <div>
          <div className="font-medium mb-2">Visibility</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 rounded-lg border border-white/15 hover:bg-white/5 cursor-pointer">
              <input type="radio" name="live-visibility" defaultChecked />
              <span>Go Live Publicly</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-lg border border-white/15 hover:bg-white/5 cursor-pointer">
              <input type="radio" name="live-visibility" />
              <span>Go Live in a Private Group</span>
            </label>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <select className="h-10 rounded-lg bg-background/70 border border-white/10 px-3">
            <option>Select Group (optional)</option>
            <option>Architecture Circle</option>
          </select>
          <div />
        </div>

        <div>
          <label className="block text-sm mb-1">Live Stream Title</label>
          <input className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="Title" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea className="w-full min-h-[100px] rounded-lg bg-background/70 border border-white/10 px-3 py-2" placeholder="What will you stream?" />
        </div>

        <div className="flex gap-3">
          <Link href="/live/keys" className="h-10 px-4 rounded-lg bg-accent text-black">Next</Link>
          <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Cancel</button>
        </div>
      </div>
    </div>
  );
}
