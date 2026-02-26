"use client";

import AddLearningGoals from "@/components/community/add-learning";
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
import { startTransition, useEffect, useState } from "react";

export default function CommunityPage() {
  // ----------------------------
  // STATE
  // ----------------------------
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"goals" | "matches">("goals");

  // ----------------------------
  // FETCH COMMUNITIES
  // ----------------------------
  const { data: communities, isLoading: isLoadingCommunities } =
    useCommunities();

  // ----------------------------
  // FETCH GOALS FOR SELECTED COMMUNITY
  // ----------------------------
  const { data: communityGoals, isLoading: isLoadingCommunityGoals } =
    useCommunityGoals(selectedCommunity ?? "");

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
          <CardDescription>{communities?.length ?? 0} joined</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {communities?.map((c: any) => (
            <Button
              key={c.community.id}
              className="w-full justify-start"
              onClick={() => setSelectedCommunity(c.community.id)}
              variant={
                selectedCommunity === c.community.id ? "default" : "outline"
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
            <div className="space-y-4">
              {isLoadingCommunityGoals ? (
                <div>Loading goals...</div>
              ) : (
                <>
                  {/* Goals List */}
                  {communityGoals?.map((goal: any) => (
                    <Card
                      key={goal.id}
                      className="
      border bg-background shadow-sm
      hover:shadow-md hover:-translate-y-1
      transition-all duration-200
      relative overflow-hidden
    "
                    >
                      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {goal.title}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-3">
                            {goal.description}
                          </CardDescription>
                          {goal.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {goal.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 bg-muted rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                          onClick={() => {
                            if (confirm("Really delete this learning goal?")) {
                              deleteGoalMutation.mutate(
                                {
                                  goalId: goal.id,
                                  communityId: selectedCommunity!,
                                },
                                {
                                  onSuccess: () => {
                                    // Optional: you can show a toast here
                                    // toast.success("Goal deleted")
                                  },
                                  onError: (err) => {
                                    console.error(err);
                                    // toast.error("Could not delete goal")
                                  },
                                },
                              );
                            }
                          }}
                          disabled={deleteGoalMutation.isPending}
                        >
                          {deleteGoalMutation.isPending ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <Trash2Icon className="size-4" />
                          )}
                        </Button> */}
                      </CardHeader>
                    </Card>
                  ))}

                  {/* Always visible */}
                  <AddLearningGoals selectedCommunityId={selectedCommunity!} />
                </>
              )}
            </div>
          ) : (
            <AIMatching
              totalGoals={communityGoals?.length ?? 0}
              selectedCommunityId={selectedCommunity!}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
