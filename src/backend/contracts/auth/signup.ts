import { email, password, username } from "@/backend/contracts/shared/auth";
import z from "zod";
import { Db } from "../../../../prisma/db";

export const signup = z.object({
  email: email,
  password: password,
  username: username,
});

export type Signup = z.infer<typeof signup>;

export type SignupResponse = Db["Users"];
