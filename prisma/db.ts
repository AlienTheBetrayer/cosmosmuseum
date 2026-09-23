import "server-only"
import "temporal-polyfill/full/global";
import "temporal-polyfill/types/global";

import postgres from "@prisma/orm-postgres/runtime";
import type { Contract, FieldOutputTypes } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL,
}).orm.public;

export type Db = FieldOutputTypes["public"]