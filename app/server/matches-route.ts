import { aiMatchUser } from "@/lib/ai";
import { Hono } from "hono";
import { authMiddleware } from "./middlewares/auth-middleware";

type Variables = {
  userId: string;
};

export const matchesApp = new Hono<{ Variables: Variables }>()
  .use("/*", authMiddleware)
  .post("/:communityId/ai-match", async (c) => {
    const user = c.get("user");
    const communityId = c.req.param("communityId");

    const aiMatch = await aiMatchUser(communityId, user);
    return c.json(aiMatch);
  });
