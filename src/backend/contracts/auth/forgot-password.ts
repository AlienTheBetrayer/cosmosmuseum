import {
  email,
  password,
  code as verificationCode,
} from "@/backend/contracts/shared/auth";
import z from "zod";

export const forgotPassword = z.object({
  email: email,
  password: password,
  code: verificationCode,
});

export type ForgotPassword = z.infer<typeof forgotPassword>;

export type ForgotPasswordResponse = boolean;
