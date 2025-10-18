"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GroupJoinPage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    
    setIsLoading(true);
    setMessage("");
    
    // TODO: Implement API call to join group
    console.log("Joining group with code:", joinCode);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response - replace with actual API response
    const success = Math.random() > 0.3; // 70% success rate for demo
    
    if (success) {
      setMessage("Successfully joined the group!");
      setJoinCode("");
      setTimeout(() => {
        router.push("/groups");
      }, 1500);
    } else {
      setMessage("Invalid group code. Please check and try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Join a Group</h1>
        <p className="text-sm text-white/70 mt-1">Enter the group code to join an existing group</p>
      </div>
      
      <form onSubmit={handleJoinGroup} className="rounded-2xl border border-white/10 p-6 bg-muted/50 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Group Code</label>
          <input 
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-accent/50" 
            placeholder="Enter group code (e.g. ARCH2024)" 
            required
            maxLength={20}
          />
        </div>
        
        {message && (
          <div className={`text-sm p-3 rounded-lg ${
            message.includes("Successfully") 
              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}>
            {message}
          </div>
        )}

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isLoading || !joinCode.trim()}
            className="w-full h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {isLoading ? "Joining..." : "Join Group"}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-white/70 mb-3">Don't have a group code?</p>
        <Link 
          href="/groups/create" 
          className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-white/15 hover:bg-white/5 transition"
        >
          Create a New Group
        </Link>
      </div>

      <div className="text-xs text-white/60 space-y-1">
        <p>• Ask a group member for the join code</p>
        <p>• Group codes are case-insensitive</p>
        <p>• You can leave a group anytime from the group page</p>
      </div>
    </div>
  );
}


