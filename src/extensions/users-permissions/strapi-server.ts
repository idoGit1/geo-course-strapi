import type { Context } from "koa";

// Define the expected shape of the authentication response
interface AuthResponseBody {
  jwt?: string;
  user?: Record<string, unknown>;
}

export default (plugin: any) => {
  const setTokenCookie = (ctx: Context): void => {
    // Cast ctx.body to our expected type
    const body = ctx.body as AuthResponseBody;

    if (body && body.jwt) {
      ctx.cookies.set("jwt", body.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days
        path: "/",
        sameSite: "lax",
      });
    }
  };

  const originalAuthController = plugin.controllers.auth;

  plugin.controllers.auth = ({ strapi }: { strapi: unknown }) => {
    const authController = originalAuthController({ strapi });
    const originalLogin = authController.callback;
    const originalRegister = authController.register;

    authController.callback = async (ctx: Context): Promise<void> => {
      await originalLogin(ctx);
      setTokenCookie(ctx);
    };

    authController.register = async (ctx: Context): Promise<void> => {
      await originalRegister(ctx);
      setTokenCookie(ctx);
    };

    authController.logout = (ctx: Context): void => {
      ctx.cookies.set("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      ctx.send({ message: "Logged out successfully" });
    };

    return authController;
  };

  return plugin;
};
