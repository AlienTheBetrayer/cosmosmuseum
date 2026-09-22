import z from "zod";
import { Db } from "../../../../prisma/db";
import { identifier } from "@/backend/contracts/shared/auth";

export const find = identifier;

export type Find = z.infer<typeof find>;

export type FindResponse = Db["Users"] | null;
