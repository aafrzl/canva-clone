import { db } from "@/db/drizzle";
import { projectInsertSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.isPro), desc(projects.updatedAt));

      return c.json({
        data,
      });
    }
  )
  .get(
    "/templates-user",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const { page, limit } = c.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.isTemplate, true), eq(projects.userId, auth.token.id))
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) return c.json({ error: "Not found" }, 404);

      return c.json({ data: { id } });
    }
  )
  .delete(
    "/templates-user/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .delete(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, auth.token.id),
            eq(projects.isTemplate, true)
          )
        )
        .returning();

      if (data.length === 0) return c.json({ error: "Not found" }, 404);

      return c.json({ data: { id } });
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data.length === 0) return c.json({ error: "Not found" }, 404);

      const project = data[0];

      const duplicateProject = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          height: project.height,
          width: project.width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return c.json({ data: duplicateProject[0] });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page, limit } = c.req.valid("query");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.userId, auth.token.id),
            eq(projects.isTemplate, false)
          )
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      projectInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) return c.json({ error: "Not found" }, 404);

      return c.json({ data: data[0] });
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.userId, auth.token.id), eq(projects.id, id)));

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/template",
    verifyAuth(),
    zValidator(
      "json",
      projectInsertSchema.pick({
        name: true,
        json: true,
        height: true,
        width: true,
        thumbnailUrl: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const { name, json, width, height, thumbnailUrl } = c.req.valid("json");

      const project = await db
        .insert(projects)
        .values({
          name,
          json,
          height,
          width,
          isPro: false,
          thumbnailUrl,
          userId: auth.token.id,
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!project[0]) return c.json({ error: "Something went wrong" }, 500);

      return c.json({ data: project[0] });
    }
  )
  .post(
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
          isTemplate: false,
          isPro: false,
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
