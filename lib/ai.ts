// this is where our all ai-code and logic will live :-
// ! This file has 2 features one for the aisummaries and one is the aimatching the users with the learners.

import { User } from "@clerk/nextjs/server";
import { getCommunityMembers, getGoalsByUser } from "./db-helpers";
import { string } from "zod";

export const aiMatchUser = async (communityId: string, user: User) => {
  // * 1. get the current user's goal :-

  const currentUserLearningGoals = await getGoalsByUser(user.id, communityId);

  // * 2. get all the other members from the community and their learning goals.

  // First checking for the matches if the user is a part of a community or not and not join the same community.
  const members = await getMembersInCommunity(communityId, user.id);

  const existingMatches = await getUserMatchingInCommunity(
    user.id,
    communityId,
  );

  const existingMatchesUserIds = new Set(
    existingMatches.map((m) => getPartnerUserId(m, user.id)),
  );

  const potentialMembersId = members
    .filter((m) => !existingMatchesUserIds.has(m.id))
    .map((m) => m.user.id);

  const goalsMap = await getGoalsByUsersAndCommunity(
    potentialMembersId,
    communityId,
  );

  // * 3. Check for the current existing matches.
  //  * 4. Invokeing the AI matches
  //  * 5. Then at last we need to make the record in the db.
  // created a new route for the matches in the route.ts
};

export const generateAiSummaries = () => {};
