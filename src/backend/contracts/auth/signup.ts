import z from "zod";

export const signup = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export type Signup = z.infer<typeof signup>;

export type SignupResponse = { data: Signup; status: "BONERITTA" | "PENISITA" };