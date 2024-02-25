import { Hono } from "hono";
import { db, schema } from "../db/client.js";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { deleteFile, renameFile, roundNumber, saveImage, validationCallBack } from "../utils.js";
import { adminAuth } from "../auth.js";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpg","image/jpeg", "image/png", "image/gif"];

const products = new Hono();

//get all products
products.get("/", async (c) => {
  const { cid } = c.req.query();
  const data = await db
    .select()
    .from(schema.products)
    .where(cid ? eq(schema.products.cid, cid) : undefined);
  // const data = cid?
  // dummy_products.filter((p) => p.cid === cid):
  // dummy_products
  return c.json(data, 200);
});

// get a product by id
products.get("/:pid", async (c) => {
  const pid = c.req.param("pid");
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.pid, pid));
  const data = rows[0];
  // const data = dummy_products.filter((p) => p.pid === pid)[0];
  if (!data) {
    return c.text("Product not found", 404);
  }
  return c.json(data, 200);
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
    if (!(image instanceof File && image.size)) {
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
    const price = roundNumber(parseFloat(_price), 2);
    const inventory = Math.floor(parseInt(_int));
    if (isNaN(price)||price <0 || isNaN(inventory)||inventory<0) {
      return c.text("Invalid form data", 400);
    }
    const extension = image.type.split("/")[1];
    const fileToSave = `${name}.${extension}`;
    const entry = {
      pid,
      name,
      price,
      description,
      inventory,
      cid,
      image: fileToSave,
    };

    try {
      await db.transaction(async (tx) => {
        //insert product
        await tx.insert(schema.products).values(entry);
        //save image, if it fails, the transaction will be rolled back
        await saveImage(image, fileToSave);
        return true;
      });
      return c.json(entry, 201);
    } catch (error: any) {
      const message = error.message ?? "Unknown error";
      return c.text(message, 400);
    }
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
    const image_entry= fd.get("image");
    const image = image_entry instanceof File && image_entry.size ? image_entry : undefined;
    const {
      name:_name,
      price: _price,
      description:_description,
      inventory: _int,
      cid:_cid,
    } = c.req.valid("form");
    const name = _name ? _name : undefined;
    const description = _description ? _description : undefined;
    const cid = _cid ? _cid : undefined;
    const price = _price ? roundNumber(parseFloat(_price),2) : undefined;
    const inventory = _int ? Math.floor(parseInt(_int)) : undefined;

    //handle invalid form data
    const invalidPrice = price && (isNaN(price)||price<0);
    const invalidInventory = inventory && (isNaN(inventory) || inventory<0);

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
      image:undefined as string|undefined
    };

    // either or bath of image and name is updated
    const needUpdateImage = !!image || !!name
    // name is updated but image is not => rename image in the directory
    const needRenameImage = !!name && !image;
    // image is updated but name is not => delete old image and save new image
    const needSaveImage = !!image && !name;
    // both name and image are updated => delete old image, save new image with new name
    const updateBoth = !!image && !!name;

    const fileOpToDo = {
      rename:undefined as {oldName:string,newName:string}|undefined,
      save:undefined as {image:File,filename:string}|undefined,
      delete:undefined as {filename:string}|undefined
    }

    // console.log(updateData);

    try {
      //perform update
      await db.transaction(async (tx) => {
        //check if need to update image col and directory
        if(needUpdateImage){
          const data = await db.query.products.findFirst({
            columns: {
              image: true,
              name: true,
            },
            where: eq(schema.products.pid, pid),
          });
          if(!data){
            throw new Error("Product not found")
          }
          const oldImageName = data.image;
          if(needRenameImage){
            // name is updated but image is not => rename image in the directory
            const extension = oldImageName.split(".")[1];
            const newImage = `${name}.${extension}`;
            updateData.image = newImage;
            fileOpToDo.rename = {oldName:oldImageName,newName:newImage};
          }else if(needSaveImage){
            // image is updated but name is not => delete old image and save new image
            const extension = image!.type.split("/")[1];
            const newImage = `${data.name}.${extension}`;
            updateData.image = newImage;
            fileOpToDo.save = {image,filename:newImage};
            fileOpToDo.delete = {filename:oldImageName};
          }else if(updateBoth){
            // both name and image are updated => delete old image, save new image with new name
            const extension = image.type.split("/")[1];
            const newImage = `${name}.${extension}`;
            updateData.image = newImage;
            fileOpToDo.save = {image,filename:newImage};
            fileOpToDo.delete = {filename:oldImageName};
          }
         

        }
        //perfrom record update
        const result = await tx
          .update(schema.products)
          .set(updateData)
          .where(eq(schema.products.pid, pid));
        const affectedRows = result[0].affectedRows;
        if (affectedRows === 0) {
          throw new Error("Product not found");
        }
        
        //perform file operations

        if(fileOpToDo.rename){
          await renameFile(fileOpToDo.rename.oldName,fileOpToDo.rename.newName);
        }
        if(fileOpToDo.delete){
          await deleteFile(fileOpToDo.delete.filename);
        }
        if(fileOpToDo.save){
          await saveImage(fileOpToDo.save.image,fileOpToDo.save.filename);
        }
        return true;
      });

      return c.json(
        {
          success: true,
        },
        200
      );
    } catch (error: any) {
      const message = error.message ?? "Unknown error";
      return c.text(message, 400);
    }
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

  try {
    //perform delete
    await db.delete(schema.products).where(eq(schema.products.pid, pid));

    //delete image
    if (toDelete) {
      await deleteFile(toDelete);
    }

    return c.body(null, 204);
  } catch (error: any) {
    const message = error.message ?? "Unknown error";
    return c.text(message, 400);
  }
});

export default products;
