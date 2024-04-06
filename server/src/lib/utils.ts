import { zValidator } from "@hono/zod-validator";
import { writeFile, unlink, rename } from "fs/promises";
import { z } from "zod";
import { Context } from "hono";
import { createHmac } from "crypto";

type CallBackAugment = Parameters<
  Exclude<Parameters<typeof zValidator>[2], undefined>
>;
type R = CallBackAugment[0];
type C = CallBackAugment[1];

export class FormValidator{
  static parse = async <T>(c:Context, schema:z.ZodSchema<T>) => {
    const fd = await c.req.formData();
    const obj = Object.fromEntries(fd.entries());
    return schema.safeParse(obj);
  }
  static errorRespone = (c:Context)=>c.text("Invalid form data", 400);
}

export class BodyValidator{
  static parse = async <T>(c:Context, schema:z.ZodSchema<T>) => {
    const obj = await c.req.json();
    return schema.safeParse(obj);
  }
  static errorRespone = (c:Context)=>c.text("Invalid body data", 400);
}

export const validationCallBack = {
  query: (result: R, c: C) => {
    if (!result.success) {
      return c.text("Invalid query data", 400);
    }
  },
} as const;

export async function saveImage(image: File, filename: string) {
  const filepath = `./images/${filename}`;
  const buffer = await image.arrayBuffer();
  try {
    await writeFile(filepath, Buffer.from(buffer));
  } catch (error) {
    console.log(`Unable to save image, name of image: ${image.name}`);
    throw error;
  }
}

export async function deleteFile(filename: string) {
  const filepath = `./images/${filename}`;
  try {
    await unlink(filepath);
  } catch (error) {
    console.log(`Unable to delete image, name of image: ${filename}`);
    throw error;
  }
}

export async function renameFile(oldName: string, newName: string) {
  const oldPath = `./images/${oldName}`;
  const newPath = `./images/${newName}`;
  try {
    await rename(oldPath, newPath);
  } catch (error) {
    console.log(`Unable to rename image, name of image: ${oldName}`);
    throw error;
  }
}

export const roundNumber = (num: number, decimalPlaces: number): number => {
  const factor = 10 ** decimalPlaces;
  return Math.round(num * factor) / factor;
};

export const paginationSchema = z.object({
  pageSize: z
    .string()
    .regex(/^\d+$/)
    .default("10")
    .transform((v) => parseInt(v)),
});

export class ClientError{
  static unauthorized = (c: Context) => {
    c.status(401);
    return c.text("Unauthorized");
  }
  static forbidden = (c: Context) => {
    c.status(403);
    return c.text("Forbidden");
  }

  static badRequest = (c: Context) => {
    c.status(400);
    return c.text("Bad Request");
  }

  static upgradeRequired = (c: Context) => {
    c.status(426);
    return c.text("Upgrade Required");
  }
}

export function expiresDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const  hashAuthToken = (userId:string,authExpiry:number,hpassword:string,salt:string) => {
  const hash = createHmac("sha256", salt);
  const unhashed = `${userId}${authExpiry}${hpassword}`;
  return hash.update(unhashed).digest("hex");
}



export function stringArrayEqual(a:string[],b:string[]){
  a.sort();
  b.sort();
  if(a.length!==b.length){
    return false;
  
  }
  for(let i=0;i<a.length;i++){
    if(a[i]!==b[i]) {
      return false;
    }
  }
  return true;
}