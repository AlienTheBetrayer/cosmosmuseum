import { email } from "@/backend/contracts/shared/auth";
import z from "zod";

export const code = z.object({
  email: email,
});

export type Code = z.infer<typeof code>;

export type CodeResponse = boolean;
  