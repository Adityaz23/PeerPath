import { auth } from "@clerk/nextjs/server";
import Header from "./headers";

export default async function HeaderWrapper() {
  const { has } = await auth();
  const isPro = has({ plan: "pro_plan" });

  return <Header isPro={isPro} />;
}
