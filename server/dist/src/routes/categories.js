import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { validationCallBack } from "../utils.js";
const categories = new Hono();
//get all categories
categories.get('/', async (c) => {
    const data = await db.select().from(schema.categories);
    return c.json(data, 200);
});
// get a category by id
categories.get('/:cid', async (c) => {
    const cid = c.req.param("cid");
    console.log('cid', cid);
    const data = await db.select().from(schema.categories).where(eq(schema.categories.cid, cid));
    return c.json(data[0], 200);
});
const postCategorySchema = z.object({
    name: z.string(),
});
// create a new category
categories.post('/', zValidator("form", postCategorySchema, validationCallBack["form"]), async (c) => {
    const { name } = c.req.valid("form");
    const cid = crypto.randomUUID();
    const entry = { cid, name };
    await db.insert(schema.categories)
        .values(entry);
    return c.json(entry, 201);
});
const putCategorySchema = z.object({
    name: z.string(),
});
// update a category
categories.put('/:cid', zValidator("form", putCategorySchema, validationCallBack.form), async (c) => {
    const cid = c.req.param("cid");
    const { name } = c.req.valid("form");
    await db.update(schema.categories)
        .set({ name })
        .where(eq(schema.categories.cid, cid));
    return c.json({ cid, name }, 200);
});
// delete a category
categories.delete('/:cid', async (c) => {
    const cid = c.req.param("cid");
    await db.delete(schema.categories)
        .where(eq(schema.categories.cid, cid));
    return c.status(204);
});
export default categories;
