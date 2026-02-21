import { Apptype } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const client = hc<Apptype>("")