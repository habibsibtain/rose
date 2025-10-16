export default function GroupCreatePage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-xl font-semibold">Create a New Group</h1>
      <div className="rounded-2xl border border-white/10 p-4 bg-muted/50 space-y-4">
        <div>
          <label className="block text-sm mb-1">Group Name</label>
          <input className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="e.g. Architecture Circle" />
        </div>
        <div>
          <label className="block text-sm mb-1">Group Description</label>
          <textarea className="w-full min-h-[100px] rounded-lg bg-background/70 border border-white/10 px-3 py-2" placeholder="What's this group about?" />
        </div>
        <button className="h-10 px-4 rounded-lg bg-accent text-black">Create Group</button>
      </div>
    </div>
  );
}


