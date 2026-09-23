import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { Controller } from "@/backend/controller/core/Controller";

export const POST = new Controller()
  .validateBody(contracts.auth.signup)
  .notAuth()
  .handle(async ({ body, user }) => {
    const newUser = await modules.authService.signup(body);
    return { success: true, user: newUser };
  });
