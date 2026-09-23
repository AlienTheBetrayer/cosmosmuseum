import { Controller } from "@/backend/controller/core/Controller";
import { NextResponse } from "next/server";

export const GET = new Controller().handle(async ({ body, user, request }) => {
  // params
  const origin = new URL(request.url).origin;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
    redirect_uri: `${origin}/api/oauth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  // callback redirect
  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
  );
});
