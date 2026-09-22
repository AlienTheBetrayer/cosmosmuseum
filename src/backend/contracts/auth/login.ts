import { identifier, password } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const login = z.object({
  identifier: identifier,
  password: password,
});

export type Login = z.infer<typeof login>;

export type LoginResponse = {
  user: Db["Users"];
  session: Db["AuthSessions"];
  accessToken: string;
  refreshToken: string;
};
