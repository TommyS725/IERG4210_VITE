import { writeFile, unlink, rename } from "fs/promises";
import { z } from "zod";
import { createHmac } from "crypto";
export class FormValidator {
    static parse = async (c, schema) => {
        const fd = await c.req.formData();
        const obj = Object.fromEntries(fd.entries());
        return schema.safeParse(obj);
    };
    static errorRespone = (c) => c.text("Invalid form data", 400);
}
export const validationCallBack = {
    query: (result, c) => {
        if (!result.success) {
            return c.text("Invalid query data", 400);
        }
    },
};
export async function saveImage(image, filename) {
    const filepath = `./images/${filename}`;
    const buffer = await image.arrayBuffer();
    try {
        await writeFile(filepath, Buffer.from(buffer));
    }
    catch (error) {
        console.log(`Unable to save image, name of image: ${image.name}`);
        throw error;
    }
}
export async function deleteFile(filename) {
    const filepath = `./images/${filename}`;
    try {
        await unlink(filepath);
    }
    catch (error) {
        console.log(`Unable to delete image, name of image: ${filename}`);
        throw error;
    }
}
export async function renameFile(oldName, newName) {
    const oldPath = `./images/${oldName}`;
    const newPath = `./images/${newName}`;
    try {
        await rename(oldPath, newPath);
    }
    catch (error) {
        console.log(`Unable to rename image, name of image: ${oldName}`);
        throw error;
    }
}
export const roundNumber = (num, decimalPlaces) => {
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
export class ClientError {
    static unauthorized = (c) => {
        c.status(401);
        return c.text("Unauthorized");
    };
    static forbidden = (c) => {
        c.status(403);
        return c.text("Forbidden");
    };
    static badRequest = (c) => {
        c.status(400);
        return c.text("Bad Request");
    };
}
export function expiresDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}
export const hashAuthToken = (userId, authExpiry, hpassword, salt) => {
    const hash = createHmac("sha256", salt);
    const unhashed = `${userId}${authExpiry}${hpassword}`;
    return hash.update(unhashed).digest("hex");
};
