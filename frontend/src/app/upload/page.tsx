import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Upload</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="h-40 rounded-xl border border-dashed border-white/15 grid place-items-center text-white/70">
            Drag and drop video files to upload
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <button className="h-10 px-4 rounded-lg bg-accent text-black">Choose File</button>
            <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Upload from URL</button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="font-medium">Visibility</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/15 hover:bg-white/5 cursor-pointer">
                <input type="radio" name="visibility" defaultChecked />
                <span>Publish as a Public Video</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/15 hover:bg-white/5 cursor-pointer">
                <input type="radio" name="visibility" />
                <span>Upload to a Private Group</span>
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <select className="h-10 rounded-lg bg-background/70 border border-white/10 px-3">
                <option>Choose Admin Group</option>
                <option>Architecture Circle</option>
                <option>Friends & Family</option>
              </select>
              <Link href="/groups/create" className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 grid place-items-center">Create New Group</Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="Video title" />
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea className="w-full min-h-[120px] rounded-lg bg-background/70 border border-white/10 px-3 py-2" placeholder="Describe your video" />
            </div>
            <div>
              <label className="block text-sm mb-1">Tags</label>
              <input className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3" placeholder="e.g. arches, geometry" />
            </div>
            <div>
              <label className="block text-sm mb-1">Thumbnail</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Auto-generate</button>
                <button className="h-10 px-4 rounded-lg bg-accent text-black">Upload custom</button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Upload Progress</label>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/3 bg-accent" />
              </div>
              <div className="text-xs text-white/70 mt-1">Processing... Your video will be available shortly.</div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="h-10 px-4 rounded-lg bg-accent text-black">Publish</button>
              <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5">Save</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
