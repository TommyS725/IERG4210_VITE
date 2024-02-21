import { writeFile, unlink } from "fs/promises";
export const validationCallBack = {
    "form": (result, c) => {
        if (!result.success) {
            return c.text("Invalid form data", 400);
        }
    }
};
export function saveImage(image, filename) {
    return new Promise(async (resolve, reject) => {
        const filepath = `./images/${filename}`;
        const buffer = await image.arrayBuffer();
        try {
            await writeFile(filepath, Buffer.from(buffer));
        }
        catch (error) {
            console.error(`Unable to save image, name of image: ${image.name}`);
            reject(error);
        }
        resolve();
    });
}
export function deleteFile(filename) {
    return new Promise((resolve, reject) => {
        const filepath = `./images/${filename}`;
        try {
            unlink(filepath);
        }
        catch (error) {
            console.error(`Unable to delete image, name of image: ${filename}`);
            reject(error);
        }
        resolve();
    });
}
