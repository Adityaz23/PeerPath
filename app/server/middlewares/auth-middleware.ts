import { clerkOrCreateUserByClerk } from "@/lib/user-utils";
import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

type AuthVariables = {
  userId: string;
  user: NonNullable<Awaited<ReturnType<typeof clerkOrCreateUserByClerk>>>;
};

export const authMiddleware = async (
  c: Context<{ Variables: AuthVariables }>,
  next: Next,
) => {
  const clerkId = c.get("userId");

  const user = await clerkOrCreateUserByClerk(clerkId);
  if (!user) {
    throw new HTTPException(404, { message: "User not found!" });
  }
  c.set("user", user);
  return next();
};
