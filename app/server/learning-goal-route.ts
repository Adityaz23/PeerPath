import { db } from "@/db";
import { learningGoals } from "@/db/schema";
import { clerkOrCreateUserByClerk } from "@/lib/user-utils";
import { and, eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z, { ZodType } from "zod";
type Variables = {
  userId: string;
};

// creating a new function to validate the variable of the body form the use-goals.ts which will then post the add goal to the communities learning goals.

const validateBody = async <T>(c: Context, schema: ZodType<T>): Promise<T> => {
  const body = await c.req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new HTTPException(400, {
      message:
        errors.length === 1
          ? errors[0].message
          : `Validation failed: ${errors.map((e) => e.message).join(",")}`,
    });
  }
  return result.data;
};

// Now creating the schema which will have all the required schema for the add goal.

const createGoalSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(2000),
  tags: z.array(z.string()).optional().default([]),
  communityId: z.string().min(1),
});

const learningGoalsApp = new Hono<{ Variables: Variables }>()
  .get("/:communityId/goals", async (c) => {
    const clerkId = c.get("userId");
    const communityId = c.req.param("communityId");
    const user = await clerkOrCreateUserByClerk(clerkId);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }
    const goals = await db
      .select()
      .from(learningGoals)
      .where(
        and(
          eq(learningGoals.userId, user.id),
          eq(learningGoals.communityId, communityId),
        ),
      );
    return c.json(goals);
  })
  .post("/goals", async (c) => {
    const clerkId = c.get("userId");
    console.log("clerkId", clerkId);

    const body = await validateBody(c, createGoalSchema);
    const user = await clerkOrCreateUserByClerk(clerkId);
    console.log("user", user);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }
    const [goal] = await db
      .insert(learningGoals)
      .values({
        userId: user.id,
        communityId: body.communityId,
        title: body.title,
        description: body.description,
        tags: body.tags || [],
      })
      .returning();
    return c.json(goal);
  })

  .delete("/:communityId/goals/:goalId", async (c) => {
  const clerkId = c.get("userId");
  const goalId = c.req.param("goalId");
  const communityId = c.req.param("communityId");

  const user = await clerkOrCreateUserByClerk(clerkId);
  if (!user) {
    throw new HTTPException(404, { message: "User not found" });
  }

  const [goal] = await db
    .delete(learningGoals)
    .where(
      and(
        eq(learningGoals.id, goalId),
        eq(learningGoals.userId, user.id),
        eq(learningGoals.communityId, communityId),
      ),
    )
    .returning();

  if (!goal) {
    throw new HTTPException(404, { message: "Goal not found" });
  }

  return c.json({ message: "Goal deleted" });
});

export default learningGoalsApp;