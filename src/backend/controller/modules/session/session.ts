import { jwtService } from "@/backend/controller/modules/jwt";
import bcrypt from "bcryptjs";
import { db } from "../../../../../prisma/db";
import { contracts } from "@/backend";
import { nanoid } from "nanoid";

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
      throw new Error("no token found.");
    }

    const fn = async (type: "access" | "refresh") => {
      try {
        const token = (
          type === "access"
            ? request.cookies.get("accessToken")
            : request.cookies.get("refreshToken")
        )?.value;

        if (!token) {
          throw new Error("token is not found at all.");
        }

        // verifying the refresh token
        const verified = jwtService.verify(
          token,
          type === "access" ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET",
        );

        const found = await db.AuthSessions.include("user").first({
          id: verified.sessionId,
          userId: verified.userId,
        });

        if (!found) {
          throw new Error("session not found in the database.");
        }

        if (!found.user) {
          throw new Error("user is not found in the relation.");
        }

        // verifying the hash
        if (
          type === "refresh" &&
          !(await bcrypt.compare(token, found.refreshTokenHash))
        ) {
          throw new Error("jwt hash is not verified.");
        }

        const { user, ...session } = found;
        return { user, session };
      } catch (e) {
        const message = e instanceof Error ? e.message : null;
        throw new Error(message || "jwt token is not verified.");
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
