import bcrypt from "bcryptjs";
import { db } from "../../../../../prisma/db";
import { contracts } from "@/backend";
import { nanoid } from "nanoid";
import { modules } from "@/backend/controller";

export class sessionService {
  /**
   * verifies the authentication session from the request.
   * allows if access is valid or access is invalid but refresh is valid
   * @param request next request object
   * @returns true if verified, otherwise throws.
   */
  static async verify(
    body: contracts.session.Verify,
  ): Promise<contracts.session.VerifyResponse> {
    // params
    const { request } = body;

    // no token found whatsoever
    if (
      !request.cookies.has("refreshToken") &&
      !request.cookies.has("accessToken")
    ) {
      throw new Error("Токен не знайдено.");
    }

    const fn = async (type: "access" | "refresh") => {
      try {
        const token = (
          type === "access"
            ? request.cookies.get("accessToken")
            : request.cookies.get("refreshToken")
        )?.value;

        if (!token) {
          throw new Error("Токен не знайдено.");
        }

        // verifying the refresh token
        const verified = modules.jwtService.verify({
          token,
          key:
            type === "access" ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET",
        });

        const found = await db.AuthSessions.include("user").first({
          id: verified.sessionId,
          userId: verified.userId,
        });

        if (!found) {
          throw new Error("Сеанс не знайдено в базі даних.");
        }

        if (!found.user) {
          throw new Error("Користувача не знайдено в базі даних.");
        }

        // verifying the hash
        if (
          type === "refresh" &&
          !(await bcrypt.compare(token, found.refreshTokenHash))
        ) {
          throw new Error("Хеш JWT не перевірено.");
        }

        const { user, ...session } = found;
        return { user, session };
      } catch (e) {
        const message = e instanceof Error ? e.message : null;
        throw new Error(message || "JWT-токен не перевірено.");
      }
    };

    try {
      return await fn("access");
    } catch {
      return await fn("refresh");
    }
  }

  /**
   * creates an authentication session
   * @param id (optional) id of the session
   * @param user_id id of the user
   * @param refresh_token_hash hash of the refresh token
   * @param expiry_at expiry temporal date
   * @returns created authentication session
   */
  static async create(
    body: contracts.session.Create,
  ): Promise<contracts.session.CreateResponse> {
    const session = await db.AuthSessions.create({
      id: nanoid(),
      userId: body.user_id,
      refreshTokenHash: body.refresh_token_hash,
      expiryAt: body.expiry_at,
    });

    return session;
  }
}
