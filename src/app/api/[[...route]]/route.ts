import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";

export const runtime = "nodejs";

import images from "./images";
import users from "./users";
import ai from "./ai";

import authConfig from "@/auth.config";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");
app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/images", images)
  .route("/users", users)
  .route("/ai", ai);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
