import {
  DiscordIdentity,
  GoogleIdentity,
} from "@/backend/controller/modules/oauth/types";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { modules } from "@/backend/controller";

export class oAuthService {
  /**
   * callback function for discord
   * @param request request object
   * @returns redirects + responses
   */
  static async discordCallback(request: NextRequest) {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${error}`, request.url),
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL(`/login?error=missing_code`, request.url),
      );
    }

    const redirectUri = `${url.origin}/api/oauth/discord/callback`;

    // Exchange code for Discord tokens
    const tokenResponse = await fetch(
      "https://discord.com/api/v10/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.DISCORD_OAUTH_CLIENT_ID}:${process.env.DISCORD_OAUTH_CLIENT_SECRET}`,
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      },
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL(`/login?error=token_exchange`, request.url),
      );
    }

    // Get Discord user
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const discordUser = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL(`/login?error=user_retrieval`, request.url),
      );
    }

    await this.authenticate(discordUser);

    return NextResponse.redirect(url.origin);
  }

  /**
   * callback function for google
   * @param request request object
   * @returns redirects + responses
   */
  static async googleCallback(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${error}`, request.url),
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/login?error=missing_code", request.url),
      );
    }

    // exchange
    const origin = new URL(request.url).origin;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${origin}/api/oauth/google/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=google_token", request.url),
      );
    }

    const tokens = await tokenResponse.json();

    // 2. Get the Google user's profile
    const userResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=google_user", request.url),
      );
    }

    const googleUser = await userResponse.json();

    await this.authenticate(googleUser);

    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * authenticates a user retrieved from OAuth, creates session and sets tokens
   * @param identity service identity
   * @returns created session
   */
  static async authenticate(identity: GoogleIdentity | DiscordIdentity) {
    // user creation
    let user = await db.Users.where({ email: identity.email }).first();

    const username =
      "name" in identity
        ? identity.name
        : identity.username || identity.global_name;

    if (!user) {
      user = await modules.userService.create({
        email: identity.email,
        username,
      });
    }

    // login
    const { accessToken, refreshToken, session } =
      await modules.jwtService.issueAuthData({
        userId: user.id,
      });

    // setting
    await modules.jwtService.setHttpAuthTokens({ accessToken, refreshToken });

    return session;
  }
}
