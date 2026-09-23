import { cookies } from "next/headers";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
};

/**
 * global function that attaches authentication tokens and wraps fetch()
 * @param input relative url (do not include the initial url)
 * @param init options
 * @returns fetch() returned promise
 */
export const sfetch = async (input: string, init?: RequestInit) => {
  // cookies
  const cookieStore = await cookies();

  // url format
  const slash = input.startsWith("/") ? "" : "/";
  const url = `${getBaseUrl()}${slash}${input}`;

  // tokens
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // cookie setting + fetch
  const cookiesText = [
    accessToken && `accessToken=${accessToken}`,
    refreshToken && `refreshToken=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ");

  return fetch(url, {
    headers: {
      ...(cookiesText && { Cookie: cookiesText }),
    },
    ...(init ?? {}),
  });
};
