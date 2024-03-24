import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { set, z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { FormValidator, validationCallBack } from "../lib/utils.js";
import { checkAdminAuthToken } from "../lib/middleware.js";

const categories = new Hono();

//get all categories
categories.get("/", async (c) => {
  const data = await db.select().from(schema.categories);
  return c.json(data, 200);
  // return c.json(dummy_categories, 200)
});

// get a category by id
categories.get("/:cid", async (c) => {
  const cid = c.req.param("cid");
  const rows = await db
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.cid, cid));
  const data = rows[0];
  // const data = dummy_categories.filter((c) => c.cid === cid)[0]
  if (!data) {
    return c.text("Category not found", 404);
  }
  return c.json(data, 200);
});


//data modification routes

categories.use(checkAdminAuthToken);


const postCategorySchema = z.object({
  name: z.string(),
});

// create a new category
categories.post(
  "/",
  async (c) => {
    const parse = await FormValidator.parse(c, postCategorySchema);
    if (!parse.success) return FormValidator.errorRespone(c);
    const { name } = parse.data;
    const cid = crypto.randomUUID();
    const entry = { cid, name };
    try {
      await db.insert(schema.categories).values(entry);

      return c.json(entry, 201);
    } catch (error: any) {
      const message = error.message ?? "Unknown error";
      return c.text(message, 400);
    }
  }
);

const putCategorySchema = z.object({
  name: z.string(),
});

// update a category
categories.put(
  "/:cid",
  async (c) => {
    const cid = c.req.param("cid");
    const parse = await FormValidator.parse(c, putCategorySchema);
    if (!parse.success) return FormValidator.errorRespone(c);
    const { name } = parse.data;
    try {
      const result = await db
        .update(schema.categories)
        .set({ name })
        .where(eq(schema.categories.cid, cid));
      const affectedRows = result[0].affectedRows;
      if (affectedRows === 0) {
        return c.text("Category not found", 404);
      }

      return c.json({ cid, name }, 200);
    } catch (error: any) {
      const message = error.message ?? "Unknown error";
      return c.text(message, 400);
    }
  }
);

// delete a category by name
categories.delete(
  "/",
  zValidator("query", z.object({ name: z.string() }), validationCallBack.query),
  async (c) => {
    const name = c.req.valid("query").name;
    try {
      const res = await db
        .delete(schema.categories)
        .where(eq(schema.categories.name, name));
      const affectedRows = res[0].affectedRows;
      if (affectedRows === 0) {
        return c.text("Category not found", 404);
      }

      return c.body(null, 204);
    } catch (error: any) {
      const message = error.message ?? "Unknown error";
      return c.text(message, 400);
    }
  }
);

// delete a category by cid
categories.delete("/:cid", async (c) => {
  const cid = c.req.param("cid");
  try {
    const res = await db.delete(schema.categories).where(eq(schema.categories.cid, cid));
    const affectedRows = res[0].affectedRows;
    if (affectedRows === 0) {
      return c.text("Category not found", 404);
    }

    return c.body(null, 204);
  } catch (error: any) {
    const message = error.message ?? "Unknown error";
    return c.text(message, 400);
  }
});

export default categories;
