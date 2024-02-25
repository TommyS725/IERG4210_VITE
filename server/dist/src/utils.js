import { writeFile, unlink } from "fs/promises";
export const validationCallBack = {
    "form": (result, c) => {
        if (!result.success) {
            return c.text("Invalid form data", 400);
        }
    },
    "query": (result, c) => {
        if (!result.success) {
            return c.text("Invalid query data", 400);
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
            console.log(`Unable to save image, name of image: ${image.name}`);
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
            console.log(`Unable to delete image, name of image: ${filename}`);
            reject(error);
        }
        resolve();
    });
}
export function renameFile(oldName, newName) {
    return new Promise((resolve, reject) => {
        const oldPath = `./images/${oldName}`;
        const newPath = `./images/${newName}`;
        try {
            unlink(oldPath);
            writeFile(newPath, "");
        }
        catch (error) {
            console.log(`Unable to rename image, name of image: ${oldName}`);
            reject(error);
        }
        resolve(newName);
    });
}
export const roundNumber = (num, decimalPlaces) => {
    const factor = 10 ** decimalPlaces;
    return Math.round(num * factor) / factor;
};
