import { email, password, username } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const create = z.object({
  id: z.nanoid().optional(),
  email: email,
  username: username,
  password: password,
});

export type Create = z.infer<typeof create>;

export type CreateResponse = Db["Users"];
