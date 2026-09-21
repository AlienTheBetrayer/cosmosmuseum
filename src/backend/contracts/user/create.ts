import { password } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const create = z.object({
  email: z.email(),
  password: password,
});

export type Create = z.infer<typeof create>;

export type CreateResponse = Db["Users"];
