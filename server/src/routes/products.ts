import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { deleteFile, saveImage, validationCallBack } from "../utils.js";
import { adminAuth } from "../auth.js";
import { dummy_products } from "../dummy.js";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

const products = new Hono();

//get all products
products.get("/", async (c) => {
  const { cid } = c.req.query();
  // const data = await db
  //   .select()
  //   .from(schema.products)
  //   .where(cid ? eq(schema.products.cid, cid) : undefined);
  const data = cid?
  dummy_products.filter((p) => p.cid === cid):
  dummy_products
  return c.json(data, 200);
});

// get a product by id
products.get("/:pid", async (c) => {
  const pid = c.req.param("pid");
  // const data = await db
  //   .select()
  //   .from(schema.products)
  //   .where(eq(schema.products.pid, pid));
  const data = dummy_products.filter((p) => p.pid === parseInt(pid));
  return c.json(data[0], 200);
});

products.use(adminAuth);

const postProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  cid: z.string(),
  description: z.string(),
  inventory: z.string().default("0"),
});

// create a new product
products.post(
  "/",
  zValidator("form", postProductSchema, validationCallBack.form),
  async (c) => {
    const pid = ulid();
    const fd = await c.req.formData();
    const image = fd.get("image");
    if (!(image instanceof File)) {
      return c.text("Product image is required", 400);
    }
    if (image.size > MAX_FILE_SIZE) {
      return c.text("Product image is too large", 400);
    }
    if (!ALLOWED_MIME_TYPES.includes(image.type)) {
      return c.text("Invalid image type", 400);
    }
    const {
      name,
      price: _price,
      description,
      inventory: _int,
      cid,
    } = c.req.valid("form");
    const price = parseInt(_price);
    const inventory = parseInt(_int);
    if (isNaN(price) || isNaN(inventory)) {
      return c.text("Invalid form data", 400);
    }
    const extension = image.type.split("/")[1];
    const fileToSave = `${pid}.${extension}`;
    const entry = {
      pid,
      name,
      price,
      description,
      inventory,
      cid,
      image: fileToSave,
    };

    await db.transaction(async (tx) => {
      //insert product
      await tx.insert(schema.products).values(entry);
      //save image, if it fails, the transaction will be rolled back
      await saveImage(image, fileToSave);
      return true;
    });
    return c.json(entry, 201);
  }
);

const putProductSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  cid: z.string().optional(),
  description: z.string().optional(),
  inventory: z.string().optional(),
});

// update a product
products.put(
  "/:pid",
  zValidator("form", putProductSchema, validationCallBack.form),
  async (c) => {
    const pid = c.req.param("pid");
    const fd = await c.req.formData();
    const image = fd.get("image");
    const {
      name,
      price: _price,
      description,
      inventory: _int,
      cid,
    } = c.req.valid("form");
    const price = _price ? parseInt(_price) : undefined;
    const inventory = _int ? parseInt(_int) : undefined;

    //handle invalid form data
    const invalidPrice = price && isNaN(price);
    const invalidInventory = inventory && isNaN(inventory);
    const noUpdate =
      !name && !price && !description && !inventory && !cid && !image;
    if (invalidPrice || invalidInventory || noUpdate) {
      return c.text("Invalid form data", 400);
    }

    //handle invalid image
    if (image) {
      if (!(image instanceof File)) {
        return c.text("Image is required for this field", 400);
      }
      if (image.size > MAX_FILE_SIZE) {
        return c.text("Product image is too large", 400);
      }
      if (!ALLOWED_MIME_TYPES.includes(image.type)) {
        return c.text("Invalid image type", 400);
      }
    }

    const updateData = {
      name,
      price,
      description,
      inventory,
      cid,
    };

    //perform update
    await db.transaction(async (tx) => {
      //perfrom record update
      await tx
        .update(schema.products)
        .set(updateData)
        .where(eq(schema.products.pid, pid));
      //save image, if it fails, the transaction will be rolled back
      if (image && image instanceof File) {
        const extension = image.type.split("/")[1];
        const filename = `${pid}.${extension}`;
        await saveImage(image, filename);
      }
      return true;
    });

    return c.json(
      {
        success: true,
      },
      200
    );
  }
);

/**
 * Delete a product
 * *Image of the product will be deleted if the query parameter `deleteFile` is not set to `false`
 * *Even if the image is not deleted successfullly, the database record will be deleted
 */
products.delete("/:pid", async (c) => {
  const pid = c.req.param("pid");
  const needToDeleteFile = c.req.query("deleteFile")?.toLowerCase() !== "false";
  let toDelete: string | undefined = undefined;

  //find the image to delete
  if (needToDeleteFile) {
    const data = await db.query.products.findFirst({
      columns: {
        image: true,
      },
      where: eq(schema.products.pid, pid),
    });
    toDelete = data?.image;
  }

  //perform delete
  await db.delete(schema.products).where(eq(schema.products.pid, pid));

  //delete image
  if (toDelete) {
    await deleteFile(toDelete);
  }

  return c.status(204);
});

export default products;
