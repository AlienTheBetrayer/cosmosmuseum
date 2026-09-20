import { contracts } from "@/backend";
import { Controller } from "@/backend/controller/core/Controller";

export const POST = new Controller()
  .validateBody(contracts.auth.signup)
  .auth()
  .permission(["user:create", "project:manage"])
  .handle(async ({ body, user }) => {
    return { success: true };
  });
