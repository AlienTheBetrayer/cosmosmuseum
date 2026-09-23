import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { Controller } from "@/backend/controller/core/Controller";
import { revalidateTag } from "next/cache";

export const POST = new Controller()
  .validateBody(contracts.auth.forgotPassword)
  .permission(["user:create", "project:manage"])
  .handle(async ({ body, user }) => {
    const newUser = await modules.authService.forgotPassword(body);
    return true;
  });
