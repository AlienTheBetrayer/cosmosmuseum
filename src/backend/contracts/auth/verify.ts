import { password } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const verify = z.object({
  email: z.email(),
  password: password,
});

export type Verify = z.infer<typeof verify>;

export type VerifyResponse = Db["Users"];
