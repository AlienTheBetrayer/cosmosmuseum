import z from "zod";
import { Db } from "../../../../prisma/db";

export const find = z.union([
  z.object({
    email: z.email(),
    username: z.never().optional(),
  }),
  z.object({
    username: z.string().min(1),
    email: z.never().optional(),
  }),
]);

export type Find = z.infer<typeof find>;

export type FindResponse = Db["Users"] | null;
