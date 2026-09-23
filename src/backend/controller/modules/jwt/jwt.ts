import { modules } from "@/backend/controller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import z from "zod";
import { db } from "../../../../../prisma/db";
import { cookies } from "next/headers";

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
  static verify<T extends z.ZodObject = typeof this.defaultSchema>(body: {
    token: string;
    key: string;
    schema?: T;
  }) {
    // key
    const processKey = process.env[body.key];

    if (!processKey) {
      throw new Error("Ключ процесу не знайдено.");
    }

    // verifying
    const payload = jwt.verify(body.token, processKey);

    const verified = (body.schema ?? this.defaultSchema).safeParse(payload);
    if (!verified.success) {
      throw new Error(
        `Не вдалося перевірити токен за заданою схемою. Причина: ${verified.error.message}`,
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
  static sign(body: { payload: object; key: string; expiryMs: number }) {
    const variable = process.env[body.key];

    if (!variable) {
      return null;
    }

    return jwt.sign(body.payload, variable, {
      expiresIn: body.expiryMs,
    });
  }

  /**
   * issues access and refresh tokens along with a session, tied to the user
   * @param userId id of the user
   * @returns access token, refresh token and session
   */
  static async issueAuthData(body: { userId: string }) {
    // session
    const session = await modules.sessionService.create({
      id: nanoid(),
      user_id: body.userId,
      refresh_token_hash: "",
      expiry_at: Temporal.Instant.fromEpochMilliseconds(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
    });

    // signing tokens
    const payload: z.infer<typeof this.defaultSchema> = {
      sessionId: session.id,
      userId: body.userId,
    };

    const { accessToken, refreshToken } = await this.signAuthTokens({
      payload,
    });

    if (!accessToken || !refreshToken) {
      throw new Error("Не вдалося підписати токени.");
    }

    // hashing the refresh token
    const salt = await bcrypt.genSalt(10);
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

    // updating the session
    const updatedSession = await db.AuthSessions.where({
      id: session.id,
    }).update({ refreshTokenHash });

    return { accessToken, refreshToken, session: updatedSession! };
  }

  /**
   * securely sets the jwt token at the http-only cookies
   * @param name name of the token
   * @param token jwt token
   * @param expiryMs expiry in milliseconds
   */
  static async setHttpCookie(body: {
    name: string;
    token: string;
    expiryMs: number;
  }) {
    const cookieStore = await cookies();

    cookieStore.set(body.name, body.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: body.expiryMs,
    });
  }

  /**
   * gets the cookie from the store
   * @param name name of the cookie
   * @returns cookie value or undefined if not found
   */
  static async getCookie(name: string) {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  }

  /**
   * gets the raw versions of access and refresh tokens cookies
   * @returns access and refresh tokens (or null if not found)
   */
  static async getAuthTokens() {
    // getting the tokens
    const accessToken = await this.getCookie("accessToken");
    const refreshToken = await this.getCookie("refreshToken");

    return { accessToken, refreshToken };
  }

  /**
   * deletes a cookie from the store.
   * @param name name of the cookie
   */
  static async deleteCookie(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }

  /**
   * sets both auth tokens as a http-only cookie
   * @param accessToken access token string
   * @param refreshToken refresh token string
   */
  static async setHttpAuthTokens(body: {
    accessToken: string;
    refreshToken: string;
  }) {
    await this.setHttpCookie({
      name: "accessToken",
      token: body.accessToken,
      expiryMs: 15 * 60 * 1000,
    });

    await this.setHttpCookie({
      name: "refreshToken",
      token: body.refreshToken,
      expiryMs: 30 * 24 * 60 * 60 * 1000,
    });
  }

  /**
   * signs both tokens given a payload
   * @param payload token payload
   * @returns access and refresh tokens
   */
  static async signAuthTokens(body: { payload: object }) {
    // signing tokens
    const accessToken = this.sign({
      payload: body.payload,
      expiryMs: 15 * 60 * 1000,
      key: "ACCESS_TOKEN_SECRET",
    });

    const refreshToken = this.sign({
      payload: body.payload,
      expiryMs: 30 * 24 * 60 * 60 * 1000,
      key: "REFRESH_TOKEN_SECRET",
    });

    return { accessToken, refreshToken };
  }

  /**
   * sets both tokens given a payload
   * @param payload token payload
   * @param request request object
   * @param response response object
   * @returns access and refresh tokens
   */
  static async issueAuthTokens(body: { payload: object }) {
    const { accessToken, refreshToken } = await this.signAuthTokens({
      payload: body.payload,
    });

    // validating
    if (!accessToken || !refreshToken) {
      throw new Error("Не вдалося підписати токени.");
    }

    // setting cookies
    await this.setHttpAuthTokens({ accessToken, refreshToken });

    return { accessToken, refreshToken };
  }
}
