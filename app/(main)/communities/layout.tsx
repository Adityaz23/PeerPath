import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// This file will help to get the same layout for the whole communities and communities/all routes:-
export default function CommunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communities</h1>
          <p className="text-muted-foreground">
            Manage your learning goals and find your learning partners.
          </p>
        </div>
        <div>
          <Link href={"/communities/all"}>
            <Button variant="ghost">+ Join More Communities</Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
