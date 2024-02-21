import { zValidator } from "@hono/zod-validator";
import {writeFile,unlink} from "fs/promises";




type CallBackAugment = Parameters<Exclude<Parameters<typeof zValidator>[2],undefined>>
type R = CallBackAugment[0]
type C = CallBackAugment[1]

export const  validationCallBack = {
    "form":(result:R,c:C)=>{
        if(!result.success){
            return c.text("Invalid form data", 400)
        }
    }
} as const



export function saveImage(image:File,filename:string){
    return new Promise<void>(async (resolve,reject)=>{
        const filepath = `./images/${filename}`
        const buffer = await image.arrayBuffer()
        try {
           await  writeFile(filepath,Buffer.from(buffer))
        } catch (error) {
            console.error(`Unable to save image, name of image: ${image.name}`)
            reject(error)
        }
        resolve()
    })
}


export function deleteFile(filename:string){
    return new Promise<void>((resolve,reject)=>{
        const filepath = `./images/${filename}`
        try {
            unlink(filepath)
        } catch (error) {
            console.error(`Unable to delete image, name of image: ${filename}`)
            reject(error)
        }
        resolve()
    })
}