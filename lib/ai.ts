// this is where our all ai-code and logic will live :-
// ! This file has 2 features one for the aisummaries and one is the aimatching the users with the learners.
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import {users} from "@/db/schema";
import {
  getGoalsByUser,
  getGoalsByUsersAndCommunity,
  getMembersInCommunity,
  getPartnerUserId,
  getUserMatchingInCommunity,
} from "./db-helpers";
import { learningGoals } from "@/db/schema";
type DbUser = typeof users.$inferSelect;

export const aiMatchUser = async (communityId: string, user: DbUser) => {
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
    .filter((m) => !existingMatchesUserIds.has(m.user.id))
    .map((m) => m.user.id);

  const goalsMap = await getGoalsByUsersAndCommunity(
    potentialMembersId,
    communityId,
  );

  const potentialPartners = [];
  const membersWithoutGoal = [];

  for (const member of members) {
    if (existingMatchesUserIds.has(member.user.id)) continue;
    const memberGoal = goalsMap.get(member.user.id);

    if (memberGoal && memberGoal.length > 0) {
      potentialPartners.push({
        userId: member.user.id,
        username: member.user.name,
        goals: memberGoal.map((g: typeof learningGoals) => ({
          title: g.title,
          descruption: g.description || "",
        })),
      });
    } else {
      membersWithoutGoal.push(member.user.name);
    }
  }

  // *  Prompt for the AI to do what to do.
  const prompt = `
You are an AI system that matches learning partners inside a community.

Your job is to analyze the CURRENT USER and a list of POTENTIAL PARTNERS.
You must determine which partners are the best match based on:

- Similar learning goals
- Complementary learning goals
- Overlapping topics
- Logical collaboration potential

-------------------------------------
CURRENT USER:
Name: ${user.name}

Learning Goals:
${currentUserLearningGoals
  .map((g) => `- ${g.title}: ${g.description ?? ""}`)
  .join("\n")}

-------------------------------------
POTENTIAL PARTNERS:
${potentialPartners
  .map(
    (p, index) => `
Partner ${index + 1}:
UserId: ${p.userId}
Name: ${p.username}
Goals:
${p.goals.map((g:typeof learningGoals) => `- ${g.title}: ${g.description}`).join("\n")}
`,
  )
  .join("\n")}

-------------------------------------

INSTRUCTIONS:

1. Compare learning goals carefully.
2. Identify strong overlaps.
3. Identify complementary skills.
4. Score compatibility from 0 to 100.
5. Only include partners with score >= 50.
6. Sort results from highest score to lowest.
7. Keep reasoning short (max 2 sentences).
8. Return ONLY valid JSON.
9. Do NOT include markdown.
10. Do NOT include explanations outside JSON.

-------------------------------------

Return response in this exact format:

{
  "matches": [
    {
      "userId": "string",
      "score": number,
      "reason": "short explanation"
    }
  ]
}
`;

  //   Passing the AI models :-
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  console.log(text);

  // * 3. Check for the current existing matches.
  //  * 4. Invokeing the AI matches
  //  * 5. Then at last we need to make the record in the db.
  // created a new route for the matches in the route.ts
};

export const generateAiSummaries = () => {};
