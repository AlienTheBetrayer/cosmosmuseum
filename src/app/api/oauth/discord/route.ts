import { Controller } from "@/backend/controller/core/Controller";
import { NextResponse } from "next/server";

export const GET = new Controller().notAuth().handle(async ({ body, user, request }) => {
  // params
  const origin = new URL(request.url).origin;

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_OAUTH_CLIENT_ID!,
    redirect_uri: `${origin}/api/oauth/discord/callback`,
    response_type: "code",
    scope: "identify email",
  });

  // callback redirect
  return NextResponse.redirect(
    `https://discord.com/oauth2/authorize?${params}`,
  );
});
