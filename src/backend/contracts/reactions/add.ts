import z from "zod";
import { Db } from "../../../../prisma/db";

export const add = z.object({
  id: z.nanoid().optional(),
  emoji: z.emoji(),
  exhibit_id: z.string(),
});

export type Add = z.infer<typeof add>;

export type AddResponse = Db["Emojis"];
