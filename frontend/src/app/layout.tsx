import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeaderActions } from "./partials/HeaderActions";
import { Shell } from "./partials/Shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NurStream",
  description: "Aesthetic video platform inspired by Islamic architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pattern-bg`}
      >
        <div className="min-h-screen grid grid-rows-[auto_1fr]">
          <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-white/10">
            <div className="w-full px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 focus-ring">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent" />
                </div>
                <span className="font-semibold tracking-wide">NurStream</span>
              </Link>
              <div className="flex items-center gap-3 w-full max-w-xl mx-6">
                <div className="relative flex-1">
                  <input
                    type="search"
                    placeholder="Search videos, channels..."
                    className="w-full h-10 rounded-full bg-muted/80 border border-white/10 px-4 pr-10 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60">⌘K</div>
                </div>
              </div>
              <HeaderActions />
            </div>
            <div className="arch-divider h-6 bg-background" />
          </header>
          <Shell>{children}</Shell>
        </div>
      </body>
    </html>
  );
}
