export default function GroupJoinPage() {
  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-xl font-semibold">Join a Group</h1>
      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50 space-y-4">
        <div>
          <label className="block text-sm mb-1">Joining Code</label>
          <input className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="Enter code" />
        </div>
        <button className="h-10 px-4 rounded-lg bg-accent text-black">Join</button>
      </div>
    </div>
  );
}


