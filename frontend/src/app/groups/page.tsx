"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data - replace with actual API calls
const mockGroups = [
  {
    id: 1,
    name: "Architecture Circle",
    description: "A group for architecture enthusiasts to share ideas and projects",
    memberCount: 12,
    joinCode: "ARCH2024",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Tech Innovators",
    description: "Latest tech trends and innovation discussions",
    memberCount: 8,
    joinCode: "TECH2024",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Design Masters",
    description: "UI/UX design community sharing best practices",
    memberCount: 15,
    joinCode: "DESIGN2024",
    createdAt: "2024-01-25"
  }
];

export default function GroupsPage() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to join group
    console.log("Joining group with code:", joinCode);
    setJoinCode("");
    setShowJoinForm(false);
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Groups</h1>
        <div className="flex gap-2">
          <Link href="/groups/create" className="h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition inline-flex items-center justify-center">
            Create Group
          </Link>
          <button 
            onClick={() => setShowJoinForm(!showJoinForm)}
            className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition inline-flex items-center justify-center"
          >
            Join Group
          </button>
        </div>
      </div>

      {showJoinForm && (
        <div className="rounded-2xl border border-white/10 p-4 bg-muted/50">
          <h3 className="font-medium mb-3">Join a Group</h3>
          <form onSubmit={handleJoinGroup} className="flex gap-2">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter group code"
              className="flex-1 h-10 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button 
              type="submit"
              className="h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition inline-flex items-center justify-center"
            >
              Join
            </button>
            <button 
              type="button"
              onClick={() => setShowJoinForm(false)}
              className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition inline-flex items-center justify-center"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {mockGroups.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium mb-2">No groups yet</h3>
          <p className="text-white/70 mb-4">Create your first group or join an existing one</p>
          <div className="flex gap-2 justify-center">
            <Link href="/groups/create" className="h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition inline-flex items-center justify-center">
              Create Group
            </Link>
            <button 
              onClick={() => setShowJoinForm(true)}
              className="h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition inline-flex items-center justify-center"
            >
              Join Group
            </button>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGroups.map((group) => (
            <Link 
              key={group.id} 
              href={`/groups/${group.id}`} 
              className="block rounded-xl border border-white/10 p-4 bg-muted/50 hover:border-white/20 transition group"
            >
              <div className="font-medium mb-1 group-hover:text-accent transition">{group.name}</div>
              <div className="text-sm text-white/70 mb-2 line-clamp-2">{group.description}</div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{group.memberCount} members</span>
                <span>Code: {group.joinCode}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


