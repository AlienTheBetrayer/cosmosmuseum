import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { Controller } from "@/backend/controller/core/Controller";

export const POST = new Controller()
  .validateBody(contracts.auth.logout)
  .permission(["user:create", "project:manage"])
  .handle(async ({ body, user }) => {
    const success = await modules.authService.logout(body);
    return { success };
  });
