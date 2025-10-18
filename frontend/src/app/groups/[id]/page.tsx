"use client";

import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { useState } from "react";

export default function GroupHubPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const isAdmin = Number(params.id) % 2 === 1;
  const code = "ARCH2024";
  
  // Mock group data - replace with actual API call
  const groupData = {
    name: "Architecture Circle",
    description: "A group for architecture enthusiasts to share ideas and projects",
    memberCount: 12,
    joinCode: code,
    isPrivate: true
  };
  
  const content = Array.from({ length: 6 }).map((_, i) => ({
    id: `${params.id}-${i}`,
    title: `Private Upload ${i + 1}`,
    channel: "Group Members",
    views: `${(i + 1) * 2} views`,
    date: "today",
    thumbnailUrl: `https://images.unsplash.com/photo-1520697222862-790a1f685b02?q=80&w=1200&auto=format&fit=crop`,
  }));

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-accent/20 to-accent-2/20" />
        <div className="p-4 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{groupData.name}</h1>
            <p className="text-sm text-white/70 mb-1">{groupData.description}</p>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span>{groupData.memberCount} members</span>
              <span>{groupData.isPrivate ? "Private Group" : "Public Group"}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/live/setup?group=1" className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition">
              Go Live
            </Link>
            {isAdmin && (
              <>
                <Link href="/upload" className="h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition">
                  Upload Content
                </Link>
                <button className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition">
                  Manage Members
                </button>
              </>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-white/10 p-3 bg-white/5 flex items-center justify-between">
              <div>
                <div className="text-sm text-white/70">Joining Code</div>
                <div className="font-mono text-lg">{code}</div>
              </div>
              <button 
                onClick={copyCode}
                className="h-9 px-3 rounded-lg border border-white/15 hover:bg-white/5 transition"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.length === 0 ? (
          <div className="text-white/70">No content yet.</div>
        ) : (
          content.map((v) => <VideoCard key={v.id} {...v} />)
        )}
      </div>
    </div>
  );
}


