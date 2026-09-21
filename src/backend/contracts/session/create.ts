import z from "zod";
import { Db } from "../../../../prisma/db";

export const create = z.object({
  id: z.nanoid().optional(),
  user_id: z.nanoid(),
  refresh_token_hash: z.string(),
  expiry_at: z.instanceof(Temporal.Instant)
});

export type Create = z.infer<typeof create>;

export type CreateResponse = Db["AuthSessions"];
