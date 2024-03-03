import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { inArray } from "drizzle-orm";

const shoppingCart = new Hono();

shoppingCart.get("/init", async c=>{
    const pids = c.req.queries('pid[]')??[]
    if(pids.length === 0){
        return c.json([])
    }
    const rows = await db
    .select({
        pid: schema.products.pid,
        name: schema.products.name,
        price: schema.products.price,
    })
    .from(schema.products)
    .where(
        inArray(schema.products.pid, pids)
    )
    // console.log(rows)
    return c.json(rows)
})



export default shoppingCart;