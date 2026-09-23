import z from "zod";

export const logout = z.object();

export type Logout = z.infer<typeof logout>;

export type LogoutResponse = boolean;