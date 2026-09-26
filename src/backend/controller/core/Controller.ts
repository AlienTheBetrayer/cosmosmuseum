import { modules } from "@/backend/controller";
import { Permission } from "@/backend/types/permissions";
import { PipelineConfig } from "@/backend/types/pipeline";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { Db } from "../../../../prisma/db";
import { AppError } from "@/backend/lib/error";

export class Controller<TBody = unknown, TQuery = unknown> {
  /**
   * config for pipeline chain
   */
  private pipeline: PipelineConfig = {
    auth: null,
    notAuth: null,
    permission: null,
    bodySchema: null,
    querySchema: null,
  };

  public validateBody<T>(schema: z.ZodType<T>) {
    this.pipeline.bodySchema = schema;
    return this as unknown as Controller<T, TQuery>;
  }

  public validateQuery<T>(schema: z.ZodType<T>) {
    this.pipeline.querySchema = schema;
    return this as unknown as Controller<TBody, T>;
  }

  public auth(config: { guard?: boolean } = { guard: true }) {
    this.pipeline.auth = { enabled: true, guard: config.guard ?? false };
    return this;
  }

  public notAuth() {
    this.pipeline.notAuth = true;
    return this;
  }

  public permission(permission: Permission[]) {
    this.pipeline.permission = permission;
    return this;
  }

  public handle<TResponse>(
    fn: (ctx: {
      body: TBody;
      query: TQuery;
      user: Db["Users"] | null;
      session: Db["AuthSessions"] | null;
      request: NextRequest;
      requestId: string;
    }) => Promise<TResponse>,
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      try {
        const url = new URL(request.url);

        // body validation
        let rawBody = {} as TBody;

        if (request.method !== "GET" && request.method !== "HEAD") {
          rawBody = await request
            .clone()
            .json()
            .catch(() => ({}));
        }

        let body = rawBody;

        if (this.pipeline.bodySchema) {
          body = this.pipeline.bodySchema.parse(rawBody) as TBody;
        }

        // query validation
        let query = Object.fromEntries(url.searchParams.entries()) as TQuery;

        if (this.pipeline.querySchema) {
          query = this.pipeline.querySchema.parse(query) as TQuery;
        }

        // auth validation
        let user = null;
        let session = null;

        if (this.pipeline.auth?.enabled) {
          try {
            // will throw if not authenticated
            ({ user, session } = await modules.sessionService.verify({
              request,
            }));
          } catch {
            if (this.pipeline.auth.guard) {
              throw new Error(
                "Цей шлях доступний тільки для аутентифікованих користувачів.",
              );
            }
          }
        }

        if (this.pipeline.notAuth) {
          try {
            const verified = await modules.sessionService.verify({ request });

            if (verified) {
              throw new Error(
                "Цей шлях доступний тільки для неаутентифікованих користувачів.",
              );
            }
          } catch {
            /* */
          }
        }

        // context constructing
        const context = {
          body,
          query,
          user,
          session,
          request,
          requestId: crypto.randomUUID(),
        };

        // success
        const result = await fn(context);

        if (result instanceof NextResponse) {
          return result;
        }

        return NextResponse.json(
          { data: result, error: null },
          { status: 200 },
        );
      } catch (error: unknown) {
        // standard error
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            { data: null, error: z.treeifyError(error) },
            { status: 400 },
          );
        }

        // unknown error
        const appError = error instanceof AppError ? error : null;

        if (!appError) {
          const message =
            error instanceof Error ? error.message : String(error);

          return NextResponse.json(
            { data: null, error: message },
            { status: 500 },
          );
        }

        // app error
        return NextResponse.json(
          {
            data: null,
            error: appError.message,
            errorData: appError.data,
          },
          { status: 500 },
        );
      }
    };
  }
}
