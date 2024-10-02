import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string({ required_error: "Name is required" }),
      email: z.string({ required_error: "Email is required" }).email({
        message: "Invalid email",
      }),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters",
      }),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const hashedPassword = await bcrypt.hash(password, 12);

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return c.text("Email already exists, use another email instead", 400);
    }

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return c.json(null, 200);
  }
);

export default app;
