import z from "zod";
import { Db } from "../../../../prisma/db";

export const get = z.object({});

export type Get = z.infer<typeof get>;

export type GetResponseItem = { exhibitId: string, emoji: string, count: number, liked: boolean };
export type GetResponse = Record<string, GetResponseItem[]>;