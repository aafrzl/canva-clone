import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

import images from "./images";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

const routes = app.route("/images", images)

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;