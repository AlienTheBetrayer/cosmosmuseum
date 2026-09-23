import { NextRequest, NextResponse } from "next/server";

export class oAuthService {
  static async discordCallback(request: NextRequest) {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      throw new Error(`Discord OAuth error: ${error}`);
    }

    if (!code) {
      throw new Error("Missing Discord authorization code.");
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
      console.error("Discord token exchange failed:", tokens);

      throw new Error("Failed to exchange Discord authorization code.");
    }

    // Get Discord user
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const discordUser = await userResponse.json();

    if (!userResponse.ok) {
      console.error("Discord user request failed:", discordUser);

      throw new Error("Failed to retrieve Discord user.");
    }

    console.log("DISCORD USER:", discordUser);

    // TODO:
    // find/create your user
    // create your AuthSession
    // set your session cookie

    return NextResponse.redirect(url.origin);
  }

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
      console.error(
        "Google token exchange failed:",
        await tokenResponse.text(),
      );

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
      console.error("Google userinfo failed:", await userResponse.text());

      return NextResponse.redirect(
        new URL("/login?error=google_user", request.url),
      );
    }

    const googleUser = await userResponse.json();

    console.log("Google user:", googleUser);

    // 3. YOUR AUTH LOGIC GOES HERE

    return NextResponse.redirect(new URL("/", request.url));
  }
}
