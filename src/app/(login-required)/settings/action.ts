"use server";

import { eq } from "drizzle-orm";
import { ZodError, z } from "zod";
import { getCurrentUser } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function updateUser(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    const values = z
      .object({
        name: z.string(),
        username: z.string().min(2).max(50),
      })
      .parse({
        name: formData.get("name"),
        username: formData.get("username"),
      });

    await db.update(users).set(values).where(eq(users.id, user.id));
  } catch (err) {
    if (err instanceof ZodError) return err;
  }
}
