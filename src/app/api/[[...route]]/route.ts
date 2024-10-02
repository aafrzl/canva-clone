import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

import images from "./images";
import users from "./users";

const app = new Hono().basePath("/api");

const routes = app.route("/images", images).route("/users", users);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
