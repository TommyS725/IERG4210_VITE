import { Hono } from "hono";
import { db, schema } from "../db/client";
import { inArray } from "drizzle-orm";

const shoppingList = new Hono();

shoppingList.get("/", async c=>{
    const pids = c.req.queries('pid')??[]
    if(pids.length === 0){
        return c.json([])
    }
    const rows = await db
    .select({
        name: schema.products.name,
        price: schema.products.price,
    })
    .from(schema.products)
    .where(
        inArray(schema.products.pid, pids)
    )
    return c.json(rows)
})



export default shoppingList;