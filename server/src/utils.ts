import { zValidator } from "@hono/zod-validator";
import {writeFile,unlink} from "fs/promises";
import { z } from "zod";




type CallBackAugment = Parameters<Exclude<Parameters<typeof zValidator>[2],undefined>>
type R = CallBackAugment[0]
type C = CallBackAugment[1]

export const  validationCallBack = {
    "form":(result:R,c:C)=>{
        if(!result.success){
            return c.text("Invalid form data", 400)
        }
    },
    "query":(result:R,c:C)=>{
        if(!result.success){
            return c.text("Invalid query data", 400)
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
            console.log(`Unable to save image, name of image: ${image.name}`)
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
            console.log(`Unable to delete image, name of image: ${filename}`)
            reject(error)
        }
        resolve()
    })
}


export function renameFile(oldName:string,newName:string){
    return new Promise<string>((resolve,reject)=>{
        const oldPath = `./images/${oldName}`
        const newPath = `./images/${newName}`
        try {
            unlink(oldPath)
            writeFile(newPath,"")
        } catch (error) {
            console.log(`Unable to rename image, name of image: ${oldName}`)
            reject(error)
        }
        resolve(newName)
    })
}

export const roundNumber = (num:number,decimalPlaces:number):number=>{
    const factor = 10**decimalPlaces
    return Math.round(num*factor)/factor
}

export const paginationSchema = z.object({
    pageSize:z.string().regex(/^\d+$/).default("10").transform((v)=>parseInt(v)),
})