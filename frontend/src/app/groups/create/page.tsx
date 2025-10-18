"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GroupCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "private" as "private" | "public"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement API call to create group
    console.log("Creating group:", formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    // Redirect to groups page
    router.push("/groups");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Create a New Group</h1>
        <p className="text-sm text-white/70 mt-1">Start a community around your interests</p>
      </div>
      
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 p-6 bg-muted/50 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Group Name</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-accent/50" 
            placeholder="e.g. Architecture Circle" 
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full min-h-[100px] rounded-lg bg-background/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50" 
            placeholder="What's this group about? What will members discuss?" 
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Visibility</label>
          <select 
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
            className="w-full h-10 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="private">Private - Invite only</option>
            <option value="public">Public - Anyone can join</option>
          </select>
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
            className="w-full h-10 px-4 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {isLoading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </form>

      <div className="text-xs text-white/60">
        <p>• Your group will get a unique join code</p>
        <p>• You'll be the admin and can manage members</p>
        <p>• Groups can be made public or kept private</p>
      </div>
    </div>
  );
}


