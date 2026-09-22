import { modules } from "@/backend/controller";
import z from "zod";

/**
 * auth interceptor that sets the access token if the refresh token is there.
 * @returns
 */
export const auth = async () => {
  // getting the cookies
  const { accessToken, refreshToken } =
    await modules.jwtService.getAuthTokens();

  // validation
  if (!refreshToken) {
    return true;
  }

  let payload: z.infer<typeof modules.jwtService.defaultSchema> | null = null;
  try {
    payload = modules.jwtService.verify({
      token: refreshToken,
      key: "REFRESH_TOKEN_SECRET",
    });
  } catch {
    return true;
  }

  // access token valid - ignore
  if (accessToken) {
    try {
      modules.jwtService.verify({
        token: accessToken,
        key: "ACCESS_TOKEN_SECRET",
      });
      return true;
    } catch {
      /**/
    }
  }

  // intercepting
  modules.jwtService.issueAuthTokens({ payload });

  return true;
};
