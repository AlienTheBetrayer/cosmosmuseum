import { password } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const login = z.object({
  email: z.email(),
  password: password,
});

export type Login = z.infer<typeof login>;

export type LoginResponse = Db["Users"];
