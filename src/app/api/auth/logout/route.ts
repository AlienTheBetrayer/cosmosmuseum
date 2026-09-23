import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { Controller } from "@/backend/controller/core/Controller";
import { revalidateTag } from "next/cache";

export const POST = new Controller()
  .validateBody(contracts.auth.logout)
  .permission(["user:create", "project:manage"])
  .handle(async ({ body, user }) => {
    const success = await modules.authService.logout(body);
    revalidateTag("me", "max");
    return { success };
  });
