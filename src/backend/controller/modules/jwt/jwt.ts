import { modules } from "@/backend/controller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import z from "zod";
import { db } from "../../../../../prisma/db";

export class jwtService {
  /**
   * default schema for token payload
   */
  static readonly defaultSchema = z.object({
    sessionId: z.nanoid(),
    userId: z.nanoid(),
  });

  /**
   * parses, verifies and validates the token and returns its payload
   * @param token token string
   * @param key key in the process.env
   * @param schema (optional) custom schema to parse the token with
   * @returns
   */
  static verify<T extends z.ZodObject = typeof this.defaultSchema>(
    token: string,
    key: string,
    schema?: T,
  ) {
    // key
    const processKey = process.env[key];

    if (!processKey) {
      throw new Error("process key is not found.");
    }

    // verifying
    const payload = jwt.verify(token, processKey);

    const verified = (schema ?? this.defaultSchema).safeParse(payload);
    if (!verified.success) {
      throw new Error(
        `failed validating token with a given schema. reason: ${verified.error.message}`,
      );
    }

    return verified.data;
  }

  /**
   * signs the jwt object safely
   * @param payload payload object
   * @param key process.env key
   * @returns signed jwt token or null if the variable was not found
   */
  static sign(payload: object, key: string) {
    const variable = process.env[key];

    if (!variable) {
      return null;
    }

    return jwt.sign(payload, variable);
  }

  /**
   * issues access and refresh tokens along with a session, tied to the user
   * @param userId id of the user
   * @returns access token, refresh token and session
   */
  static async issueAuthData(params: { userId: string }) {
    // session
    const session = await modules.sessionService.create({
      id: nanoid(),
      user_id: params.userId,
      refresh_token_hash: "",
      expiry_at: Temporal.Instant.fromEpochMilliseconds(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
    });

    // signing tokens
    const payload: z.infer<typeof this.defaultSchema> = {
      sessionId: session.id,
      userId: params.userId,
    };

    const tokens = {
      access: jwt.sign(payload, "ACCESS_TOKEN_SECRET"),
      refresh: jwt.sign(payload, "REFRESH_TOKEN_SECRET"),
    };

    if (Object.values(tokens).some((token) => !token)) {
      throw new Error("failed signing tokens.");
    }

    // hashing the refresh token
    const salt = await bcrypt.genSalt(10);
    const refreshTokenHash = await bcrypt.hash(tokens.refresh, salt);

    // updating the session
    const updatedSession = await db.AuthSessions.where({
      id: session.id,
    }).update({ refreshTokenHash });

    return { tokens, session: updatedSession! };
  }
}
