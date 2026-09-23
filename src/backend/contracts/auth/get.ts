import z from "zod";
import { Db } from "../../../../prisma/db";

export const get = z.void();

export type Get = z.infer<typeof get>;

export type GetResponse = {
  user: Db["Users"];
  session: Db["AuthSessions"];
};
