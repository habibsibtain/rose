"use client";

import { useState } from "react";
import Link from "next/link";

export type AuthFormMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthFormMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = mode === "signup";

  return (
    <div className="max-w-md w-full mx-auto bg-muted/60 border border-white/10 rounded-2xl p-6 shadow-lg">
      <h1 className="text-xl font-semibold mb-1">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="text-sm text-white/70 mb-6">
        {isSignup ? "Join to upload, create groups, and go live." : "Log in to continue."}
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/home";
        }}
      >
        {isSignup && (
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-11 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
            />
          </div>
        )}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-11 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 rounded-lg bg-background/70 border border-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
          />
        </div>
        <button className="w-full h-11 rounded-lg bg-accent text-black font-medium hover:brightness-110 transition inline-flex items-center justify-center">
          {isSignup ? "Create Account" : "Log In"}
        </button>
      </form>

      <div className="my-4 h-px bg-white/10" />

      <button className="w-full h-11 rounded-lg border border-white/15 hover:bg-white/5 transition inline-flex items-center justify-center">
        {isSignup ? "Sign up with Google" : "Continue with Google"}
      </button>

      <p className="text-sm text-white/70 mt-4 text-center">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">Log In</Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline">Sign Up</Link>
          </>
        )}
      </p>
    </div>
  );
}


