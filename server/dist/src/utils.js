import { writeFile, unlink, rename } from "fs/promises";
import { z } from "zod";
export const validationCallBack = {
    form: (result, c) => {
        if (!result.success) {
            return c.text("Invalid form data", 400);
        }
    },
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
