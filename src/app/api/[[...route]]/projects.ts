import { db } from "@/db/drizzle";
import { projectInsertSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    projectInsertSchema.pick({
      name: true,
      json: true,
      height: true,
      width: true,
    })
  ),
  async (c) => {
    const auth = c.get("authUser");
    const { name, json, width, height } = c.req.valid("json");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    const project = await db
      .insert(projects)
      .values({
        name,
        json,
        height,
        width,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!project[0]) return c.json({ error: "Something went wrong" }, 500);

    return c.json({ data: project[0] });
  }
);

export default app;
