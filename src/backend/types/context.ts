import { Models } from "../../../prisma/contract";

export type RequestContext<TBody, TQuery> = {
  body: TBody;
  query: TQuery;
  user: Models.public_Users;
  requestId: string;
};
