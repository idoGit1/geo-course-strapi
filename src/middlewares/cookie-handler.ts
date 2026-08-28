import { Core } from "@strapi/strapi";
import type { Context, Next } from "koa";

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    if (
      !ctx.path.startsWith("/api") ||
      ctx.path.startsWith("/api/auth/local")
    ) {
      return await next();
    }
    console.log(ctx?.cookies?.get("jwt"));
    const token = ctx.cookies.get("jwt");

    if (token) {
      ctx.request.header.authorization = `Bearer ${token}`;
    }
    console.log(ctx.request);
    return await next();
  };
};
