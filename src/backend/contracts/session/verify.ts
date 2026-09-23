import { NextRequest } from "next/server";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const verify = z.object({
  request: z.instanceof(NextRequest),
});

export type Verify = z.infer<typeof verify>;

export type VerifyResponse = {
  user: Db["Users"];
  session: Db["AuthSessions"];
};
