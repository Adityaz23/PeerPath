import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {User} from "@clerk/nextjs/server"

const createNewUserFromClerk = async (clerkUser: User) => {
  const [user] = await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "User",
      imageUrl: clerkUser.imageUrl,
    })
    .onConflictDoNothing()
    .returning();

  return user;
};

export const clerkOrCreateUserByClerk = async (clerkId: string) => {
  let [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }
    const emails = clerkUser.emailAddresses[0].emailAddress || " ";

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, emails));

    if (existingUser) {
      [user] = await db
        .update(users)
        .set({
          clerkId: clerkUser.id,
          name: clerkUser.username || existingUser.name,
          imageUrl: clerkUser.imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.email, emails))
        .returning();
    } else {
      // create new user if the user does not exist:-
      user = await createNewUserFromClerk(clerkUser);
    }
}
return user
};
