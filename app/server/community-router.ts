import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { clerkOrCreateUserByClerk } from "@/lib/user-utils";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

type Variables = {
  userId: string;
};
const communitiesApp = new Hono<{ Variables: Variables }>()
  .get("/all", async (c) => {
    const allCommunities = await db.select().from(communities);
    return c.json(allCommunities);
  })
  .get("/", async (c) => {
    const clerkId = c.get("userId");
    const user = await clerkOrCreateUserByClerk(clerkId);
    if (!user?.id) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const userCommunities = await db
      .select({
        id: communityMembers.id,
        userId: communityMembers.userId,
        communityId: communityMembers.communityId,
        joinedAt: communityMembers.joinedAt,
        community: communities,
      })
      .from(communityMembers)
      .innerJoin(communities, eq(communityMembers.communityId, communities.id))
      .where(eq(communityMembers.userId, user?.id));
    return c.json(userCommunities);
  })
  .post("/:communityId/join", async (c) => {
    const communityId = c.req.param("communityId");
    return c.json({
      message: `Joined ${communityId} community 
    successfully`,
    });
  });

export { communitiesApp };
