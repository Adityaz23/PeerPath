"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAllCommunities,
  useCommunities,
  useJoinCommunity,
} from "@/hooks/use-community";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

export default function MoreCommunity() {
  const {
    data: allCommunities,
    isLoading: isLoadingAllCommunities,
    error: errorAllCommunities,
  } = useAllCommunities();
  // Now setting the state for the user to see if they have joined the community or not :-

  const { data: userCommunities } = useCommunities();

  //   Now creating the useMutation for the user whenver the suer click on the join community button the community must be added to the users table.
  const isJoined = (communityId: string) => {
    return userCommunities?.some(
      (community) => community.community.id === communityId,
    );
  };
  const joinedCommunityMutation = useJoinCommunity();
  const handleJoinCommunity = async (communityId: string) => {
    console.log("Joining Community", communityId);
    await joinedCommunityMutation.mutateAsync(communityId);
  };

  if (isLoadingAllCommunities) return <div>Loading....</div>;
  if (errorAllCommunities)
    return <div>Error: {errorAllCommunities.message}</div>;

  return (
    <div>
      <Link href={"/communities"}>
        <Button variant={"ghost"}>
          <ArrowLeftIcon className="size-4" />
          Back to communities
        </Button>
      </Link>
      <div className="space-y-4 mt-4">
        <h2 className="text-2xl font-bold">Browse Communities</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allCommunities?.map((community) => (
            <Card key={community.id}>
              <CardHeader>
                <CardTitle>
                  {community.name}
                  <CardDescription>
                  {community.description}
                  </CardDescription>
                </CardTitle>
                <CardFooter className="px-0 mt-2">
                  <Button
                    className="w-full"
                    disabled={isJoined(community.id)}
                   onClick={() => handleJoinCommunity(community.id)}
                  >
                    {isJoined(community.id) ? (
                      <>
                        <CheckIcon className="size-3" />
                        Joined
                      </>
                    ) : (
                      "Join Community"
                    )}
                  </Button>
                </CardFooter>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
