import { identifier, password } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const verify = z.object({
  identifier: identifier,
  password: password,
});

export type Verify = z.infer<typeof verify>;

export type VerifyResponse = Db["Users"];
