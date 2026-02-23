"use client";

import AIMatching from "@/components/community/AIMatching";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCommunities, useCommunityGoals } from "@/hooks/use-community";
import { BotMessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";

export default function CommunityPage() {
  // ----------------------------
  // STATE
  // ----------------------------
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"goals" | "matches">("goals");

  // ----------------------------
  // FETCH COMMUNITIES
  // ----------------------------
  const {
    data: communities,
    isLoading: isLoadingCommunities,
  } = useCommunities();

  // ----------------------------
  // FETCH GOALS FOR SELECTED COMMUNITY
  // ----------------------------
  const {
    data: communityGoals,
    isLoading: isLoadingCommunityGoals,
  } = useCommunityGoals(selectedCommunity ?? "");

  // ----------------------------
  // AUTO SELECT FIRST COMMUNITY
  // ----------------------------
  useEffect(() => {
    if (communities && communities.length > 0 && !selectedCommunity) {
      startTransition(() => {
        setSelectedCommunity(communities[0].community.id);
      });
    }
  }, [communities, selectedCommunity]);

  // ----------------------------
  // LOADING STATE
  // ----------------------------
  if (isLoadingCommunities) {
    return <div className="p-6">Loading communities...</div>;
  }

  return (
   

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ----------------------------
            LEFT CARD - USER COMMUNITIES
        ----------------------------- */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Communities</CardTitle>
            <CardDescription>
              {communities?.length ?? 0} joined
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            {communities?.map((c: any) => (
              <Button
                key={c.community.id}
                className="w-full justify-start"
                onClick={() => setSelectedCommunity(c.community.id)}
                variant={
                  selectedCommunity === c.community.id
                    ? "default"
                    : "outline"
                }
              >
                {c.community.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* ----------------------------
            RIGHT CARD - GOALS / AI MATCHING
        ----------------------------- */}
        <Card className="lg:col-span-2">
          <CardHeader>
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setActiveTab("goals")}
                variant={activeTab === "goals" ? "default" : "outline"}
              >
                My Goals
              </Button>

              <Button
                onClick={() => setActiveTab("matches")}
                variant={activeTab === "matches" ? "default" : "outline"}
              >
                <BotMessageSquareIcon className="size-4 mr-2" />
                Find Partners With AI
              </Button>
            </div>

            <CardTitle>
              {activeTab === "goals"
                ? "Learning Goals"
                : "Potential Learning Partners"}
            </CardTitle>

            <CardDescription>
              {activeTab === "goals"
                ? `${communityGoals?.length ?? 0} ${
                    communityGoals?.length === 1 ? "goal" : "goals"
                  } in selected community`
                : "AI will match you based on similar learning goals"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {activeTab === "goals" ? (
              <div className="space-y-3">
                {isLoadingCommunityGoals ? (
                  <div>Loading goals...</div>
                ) : communityGoals?.length ? (
                  communityGoals.map((goal: any) => (
                    <Card
                      key={goal.id}
                      className="
                        border
                        bg-background
                        shadow-sm
                        hover:shadow-md
                        hover:-translate-y-1
                        transition-all
                        duration-200
                        cursor-pointer
                      "
                    >
                      <CardHeader>
                        <CardTitle>{goal.title}</CardTitle>
                        <CardDescription>
                          {goal.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No goals found in this community.
                  </p>
                )}
              </div>
            ) : (
              <AIMatching totalGoals={communityGoals?.length ?? 0} />
            )}
          </CardContent>
        </Card>
      </div>

  );
}