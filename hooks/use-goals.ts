import { client } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLearningGoals = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: {
      communityId: string;
      title: string;
      description: string;
      tags: string[];
    }) => {
      const res = await client.api.communities.goals.$post({
        json: {
          communityId: goal.communityId,
          title: goal.title,
          description: goal.description,
          tags: goal.tags,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to create the learning goals!");
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["communityGoals", variables.communityId],
      });
    },
    onError: (err) => {
      console.error("Error creating the new learning goal: ", err);
    },
  });
};
