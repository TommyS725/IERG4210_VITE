import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { validationCallBack } from "../utils.js";
import { adminAuth } from "../auth.js";
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
categories.use(adminAuth);
const postCategorySchema = z.object({
    name: z.string(),
});
// create a new category
categories.post("/", zValidator("form", postCategorySchema, validationCallBack["form"]), async (c) => {
    const { name } = c.req.valid("form");
    const cid = crypto.randomUUID();
    const entry = { cid, name };
    try {
        await db.insert(schema.categories).values(entry);
        return c.json(entry, 201);
    }
    catch (error) {
        const message = error.message ?? "Unknown error";
        return c.text(message, 400);
    }
});
const putCategorySchema = z.object({
    name: z.string(),
});
// update a category
categories.put("/:cid", zValidator("form", putCategorySchema, validationCallBack.form), async (c) => {
    const cid = c.req.param("cid");
    const { name } = c.req.valid("form");
    try {
        const result = await db
            .update(schema.categories)
            .set({ name })
            .where(eq(schema.categories.cid, cid));
        const affectedRows = result[0].affectedRows;
        if (affectedRows === 0) {
            return c.text("Category not found", 400);
        }
        return c.json({ cid, name }, 200);
    }
    catch (error) {
        const message = error.message ?? "Unknown error";
        return c.text(message, 400);
    }
});
// delete a category by name
categories.delete("/", zValidator("query", z.object({ name: z.string() }), validationCallBack.query), async (c) => {
    const name = c.req.valid("query").name;
    try {
        await db
            .delete(schema.categories)
            .where(eq(schema.categories.name, name));
        return c.body(null, 204);
    }
    catch (error) {
        const message = error.message ?? "Unknown error";
        return c.text(message, 400);
    }
});
// delete a category by cid
categories.delete("/:cid", async (c) => {
    const cid = c.req.param("cid");
    try {
        await db.delete(schema.categories).where(eq(schema.categories.cid, cid));
        return c.body(null, 204);
    }
    catch (error) {
        const message = error.message ?? "Unknown error";
        return c.text(message, 400);
    }
});
export default categories;
