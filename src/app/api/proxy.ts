import { middleware } from "@/backend/middleware";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  try {
    // modules
    middleware.auth(); // auth interceptor

    return NextResponse.next();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json({ message }, { status: 401 });
  }
};
