// Creating a new hono instance :-
import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { communitiesApp } from "@/app/server/community-router";
type Variables = {
  userId: string;
};
const app = new Hono<{ Variables: Variables }>().basePath("/api");

// Error Hanlding :-
app.onError((err, c) => {
  console.error("API Error: ", err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  // database error :-
  if (err instanceof Error) {
    if (
      err.message.includes("violates") ||
      err.message.includes("constraints")
    ) {
      return c.json({ error: "Invalid data provided" }, 400);
    }

    if (
      err.message.includes("not-found") ||
      err.message.includes("Not found")
    ) {
      return c.json({ error: err.message }, 404);
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }

  return c.json({ error: "Unknown error occurred" }, 500);
});

// Middlewares :-
app.use("/*", async (c, next) => {
  const publicRoutes = ["/api/communities/all"];
  if (publicRoutes.includes(c.req.path)) {
    return await next();
  }
  const session = await auth();
  if (!session.userId) {
    throw new HTTPException(401, { message: "Unauthorized!" });
  }
  c.set("userId", session.userId);
  return await next();
});

// creating all the communities api :-
app.get("/communities/all", async (c) => {
  const allCommunities = await db.select().from(communities);
  return c.json(allCommunities);
});

// app.post("/communities/:communityId/join", async (c) => {
//   const clerkId = c.get("userId") as string;
//   const communityId = c.req.param("communityId");
//   const [community] = await db
//     .select()
//     .from(communities)
//     .where(eq(communities.id, communityId));
//   if (!community) {
//     throw new HTTPException(404, { message: "Community not found" });
//   }
//   await db.insert(communityMembers).values({ userId: clerkId, communityId });
//   return c.json({ message: `Joined ${communityId} community successfully` });
// });

const routes = app.route("/communities",communitiesApp)

// .post("/communities/:communityId/join", async (c) => {
  // const communityId = c.req.param("communityId")
  // return c.json({ message: `Joined ${communityId} community successfully` });
// });

// This is the RPC feature :- Remote Procedure Call. (Calling a function on a server as it it were normal function in our frontend code.)
export type Apptype = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
