import type { Core } from "@strapi/strapi";

export default ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: env("DOMAIN"),
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "global::cookie-handler",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
