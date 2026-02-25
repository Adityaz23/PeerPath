import { db } from "@/db";
import { learningGoals } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const getCommunityMembers = async (communityId: string) => {
    const otherMembersLearningGoals = 
};

export const getGoalsByUser = async (userId: string, communityId: string) => {
  const currentUserLearningGoals = await db
    .select()
    .from(learningGoals)
    .where(
      and(
        eq(learningGoals.userId, userId),
        eq(learningGoals.communityId, communityId),
      ),
    )
    .orderBy(desc(learningGoals.createdAt));
};
