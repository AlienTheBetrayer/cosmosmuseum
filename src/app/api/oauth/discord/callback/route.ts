import { modules } from "@/backend/controller";
import { Controller } from "@/backend/controller/core/Controller";

export const GET = new Controller().handle(async ({ request }) => {
  return await modules.oAuthService.discordCallback(request);
});
