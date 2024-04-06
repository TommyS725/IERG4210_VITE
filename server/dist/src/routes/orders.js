import { Hono } from "hono";
import { requireAdmin, requireSecure } from "../lib/middleware.js";
import { z } from "zod";
import { BodyValidator, ClientError, paginationSchema, stringArrayEqual, validationCallBack } from "../lib/utils.js";
import { db, schema } from "../db/client.js";
import Session from "../lib/session.js";
import { createHmac, randomBytes } from "crypto";
import { orderDetailSchema } from "../model/orederDetail.js";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
const merchant_email = "sb-fldzh30235098@business.example.com";
const currency_code = "USD";
const ordersHandler = new Hono();
ordersHandler.use(requireSecure);
const { orders } = schema;
const cartItemSchema = z.object({
    pid: z.string(),
    quantity: z.number().min(1),
});
const fullItemSchema = cartItemSchema.extend({
    price: z.number().min(0.01),
    name: z.string().min(1),
});
function calculateTotalAmount(items) {
    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const rounded = Math.round(amount * 100) / 100;
    return rounded;
}
const unHashedDigestSchema = z
    .object({
    items: fullItemSchema.omit({ name: true }).array(),
    totalAmount: z.number().min(0.01),
    currency_code: z.literal("USD"),
    merchant_email: z.literal(merchant_email),
    salt: z.string().min(1),
})
    .refine((data) => {
    const totalAmount = calculateTotalAmount(data.items);
    return totalAmount === data.totalAmount;
});
function createDigestHash(items, salt) {
    const totalAmount = calculateTotalAmount(items);
    const unHashedDigest = {
        items,
        totalAmount,
        currency_code,
        merchant_email,
        salt,
    };
    const hash = createHmac("sha256", unHashedDigest.salt);
    const hashedDigest = hash
        .update(JSON.stringify(unHashedDigest))
        .digest("hex");
    return hashedDigest;
}
const getOrderDetailsSchema = z.object({
    cart: cartItemSchema.array(),
});
ordersHandler.post("/get-order-details", async (c) => {
    const parse = await BodyValidator.parse(c, getOrderDetailsSchema);
    if (!parse.success)
        return BodyValidator.errorRespone(c);
    const { cart } = parse.data;
    const session = await Session.getSession(c);
    if (!session) {
        return ClientError.unauthorized(c);
    }
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user) {
        return ClientError.unauthorized(c);
    }
    const pids = cart.map((c) => c.pid);
    if (pids.length === 0)
        return c.text("Empty Cart", 400);
    const products = await db.query.products.findMany({
        where: (product, { inArray }) => inArray(product.pid, pids),
        columns: {
            name: true,
            pid: true,
            price: true,
            inventory: true,
        },
    });
    if (stringArrayEqual(pids, products.map((p) => p.pid)) !== true) {
        return c.text("Invalid product id", 400);
    }
    const fullItems = [];
    for (const { pid, quantity } of cart) {
        const product = products.find((p) => p.pid === pid);
        if (!product) {
            return c.text("Invalid product id", 400);
        }
        if (product.inventory < quantity) {
            return c.text("Out of stock", 400);
        }
        fullItems.push({
            pid,
            quantity,
            name: product.name,
            price: product.price,
        });
    }
    const detailItems = fullItems.map((item) => ({
        name: item.name,
        pid: item.pid,
        unit_amount: {
            currency_code,
            value: String(item.price),
        },
        quantity: String(item.quantity),
    }));
    const UUID = crypto.randomUUID();
    const invoiceId = crypto.randomUUID();
    const salt = randomBytes(16).toString("hex");
    const totalAmount = calculateTotalAmount(fullItems);
    const totalAmountStr = String(totalAmount);
    const orderDetail = {
        purchase_units: [
            {
                amount: {
                    currency_code,
                    value: totalAmountStr,
                    breakdown: {
                        item_total: {
                            currency_code,
                            value: totalAmountStr,
                        },
                    },
                },
                items: detailItems,
                custom_id: UUID,
                invoice_id: invoiceId,
            },
        ],
    };
    const hashedDigest = createDigestHash(fullItems.map((item) => ({
        pid: item.pid,
        quantity: item.quantity,
        price: item.price,
    })), salt);
    //insert order into db, DONOT insert the orderDetails until the payment is successful
    await db.insert(orders).values({
        UUID: UUID,
        username: user.username,
        digest: hashedDigest,
        salt: salt,
    });
    return c.json(orderDetail, 200);
});
ordersHandler.post("/save-order", async (c) => {
    const session = await Session.getSession(c);
    if (!session) {
        return ClientError.unauthorized(c);
    }
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user) {
        return ClientError.unauthorized(c);
    }
    const parse = await BodyValidator.parse(c, orderDetailSchema);
    if (!parse.success) {
        console.log(parse.error.issues);
        return BodyValidator.errorRespone(c);
    }
    const orderDetail = parse.data;
    const UUID = orderDetail.purchase_units[0]?.custom_id;
    if (!UUID)
        return c.text("Invalid order", 400);
    const order = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.UUID, UUID),
    });
    if (!order)
        return c.text("Invalid order", 400);
    const items = orderDetail.purchase_units[0]?.items;
    // console.log('items',items)
    if (!items || items.length === 0)
        return c.text("Invalid order detail", 400);
    const products = await db.query.products.findMany({
        where: (products, { inArray }) => inArray(products.name, items.map((item) => item.name)),
        columns: {
            pid: true,
            name: true,
            inventory: true,
            price: true,
        },
    });
    // console.log('products',products);
    if (products.length !== items.length)
        return c.text("Invalid order detail", 400);
    const digestItems = [];
    for (const item of items) {
        const product = products.find((p) => p.name === item.name);
        if (!product)
            return c.text("Invalid order detail", 400);
        digestItems.push({
            pid: product.pid,
            quantity: parseInt(item.quantity),
            price: product.price,
        });
    }
    const hashedDigest = createDigestHash(digestItems, order.salt);
    if (hashedDigest !== order.digest)
        return c.text("Invalid order detail", 400);
    const update = await db
        .update(orders)
        .set({
        orderDetails: JSON.stringify(orderDetail),
    })
        .where(eq(orders.UUID, UUID));
    //todo: decrease the inventory of the products
    return c.json({
        success: true,
    }, 200);
});
ordersHandler.post("/cancel-order", async (c) => {
    const session = await Session.getSession(c);
    if (!session) {
        return ClientError.unauthorized(c);
    }
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user) {
        return ClientError.unauthorized(c);
    }
    const parse = await BodyValidator.parse(c, orderDetailSchema);
    if (!parse.success)
        return BodyValidator.errorRespone(c);
    const orderDetail = parse.data;
    const UUID = orderDetail.purchase_units[0]?.custom_id;
    if (!UUID)
        return c.text("Invalid order", 400);
    const order = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.UUID, UUID)
    });
    if (!order)
        return c.text("Invalid order", 400);
    if (order.orderDetails)
        return c.text("Order already processed", 400);
    const items = orderDetail.purchase_units[0]?.items;
    if (!items || items.length === 0)
        return c.text("Invalid order detail", 400);
    const products = await db.query.products.findMany({
        where: (products, { inArray }) => inArray(products.name, items.map(item => item.name)),
        columns: {
            pid: true,
            name: true,
            inventory: true,
            price: true,
        }
    });
    if (products.length !== items.length)
        return c.text("Invalid order detail", 400);
    const digestItems = [];
    for (const item of items) {
        const product = products.find(p => p.name === item.name);
        if (!product)
            return c.text("Invalid order detail", 400);
        digestItems.push({
            pid: product.pid,
            quantity: parseInt(item.quantity),
            price: product.price,
        });
    }
    const hashedDigest = createDigestHash(digestItems, order.salt);
    if (hashedDigest !== order.digest)
        return c.text("Invalid order detail", 400);
    const deleteOrder = await db.delete(orders).where(eq(orders.UUID, UUID));
    return c.json({
        success: true,
    }, 200);
});
// show most recent orders that are approved (orderDetails is not null)
const ordersToDisplay = 5;
ordersHandler.get("/my-orders", async (c) => {
    const session = await Session.getSession(c);
    if (!session) {
        return ClientError.unauthorized(c);
    }
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user) {
        return ClientError.unauthorized(c);
    }
    const userOrders = await db.query.orders.findMany({
        where: (orders, { eq, and, isNotNull }) => and(eq(orders.username, user.username), isNotNull(orders.orderDetails)),
        limit: ordersToDisplay,
        orderBy: (orders, { desc }) => desc(orders.createdAt),
        columns: {
            UUID: true,
            orderDetails: true,
            createdAt: true,
            username: true,
        }
    });
    try {
        const mutatedOrders = userOrders.map((order) => {
            if (!order.orderDetails)
                return order;
            const json = JSON.parse(order.orderDetails);
            const parsed = orderDetailSchema.parse(json);
            return {
                ...order,
                orderDetails: parsed,
            };
        });
        return c.json(mutatedOrders, 200);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.issues);
        }
        return c.text("Internal server error", 500);
    }
});
// admin  show all paginated orders 
const getAllOrdersQuerySchema = paginationSchema.extend({
    offset: z.string()
        .regex(/^\d+$/)
        .default("0")
        .transform((v) => parseInt(v)),
});
ordersHandler.get("/all-orders", requireAdmin, zValidator("query", getAllOrdersQuerySchema, validationCallBack.query), async (c) => {
    const { offset, pageSize } = c.req.valid('query');
    const data = await db.query.orders.findMany({
        offset: offset,
        limit: pageSize + 1,
        orderBy: (orders, { desc }) => desc(orders.createdAt),
    });
    const hasNext = data.length > pageSize;
    if (hasNext) {
        data.pop();
    }
    try {
        const mutatedOrders = data.map((order) => {
            if (!order.orderDetails)
                return {
                    ...order,
                    orderDetailsObj: null,
                };
            const json = JSON.parse(order.orderDetails);
            const parsed = orderDetailSchema.parse(json);
            return {
                ...order,
                orderDetailsObj: parsed,
            };
        });
        return c.json({
            data: mutatedOrders,
            hasNext,
        }, 200);
    }
    catch (error) {
        console.log(error);
        return c.text("Internal server error", 500);
    }
});
export default ordersHandler;
