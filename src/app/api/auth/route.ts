import { Controller } from "@/backend/controller/core/Controller";

export const GET = new Controller().auth().handle(async ({ body, user }) => {
  return { user };
});
