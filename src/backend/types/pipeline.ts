import { Permission } from "@/backend/types/permissions";
import z from "zod";

/**
 * config used for Controller's chain pipeline
 */
export type PipelineConfig = {
  bodySchema: z.ZodType | null;
  querySchema: z.ZodType | null;
  permission: Permission[] | null;
  notAuth: boolean | null;
  auth: { enabled: boolean, guard: boolean } | null;
};
