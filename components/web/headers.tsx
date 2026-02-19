"use client";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  LayoutDashboardIcon,
  MessageCircleCodeIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ isPro }: { isPro: boolean }) {
  const { isSignedIn } = useUser();

  return (
    <header>
      <div className="layout-container flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group inline-flex items-center text-2xl font-extrabold tracking-tighter"
          >
            <span className="bg-linear-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110">
              Peer
            </span>
            <span className="ml-1 text-zinc-400 transition-colors">
              Path
            </span>
          </Link>

          {isSignedIn && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboardIcon className="size-4" />
                  Dashboard
                </Button>
              </Link>

              <Link href="/communities">
                <Button variant="ghost" size="sm">
                  <UsersIcon className="size-4" />
                  Communities
                </Button>
              </Link>

              <Link href="/chat">
                <Button variant="ghost" size="sm">
                  <MessageCircleCodeIcon className="size-4" />
                  Chat
                </Button>
              </Link>
            </nav>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              {isPro ? (
                <Badge className="flex items-center gap-2" variant="outline">
                  <TrophyIcon className="size-3 text-primary" />
                  Pro
                </Badge>
              ) : (
                <span className="text-sm text-muted-foreground">Free</span>
              )}

              <UserButton appearance={{ elements: { avatarBox: "size-9" } }} />
              <ThemeToggle />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
