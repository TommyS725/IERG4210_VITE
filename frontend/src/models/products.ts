import {z} from "zod"

export const productSchema = z.object({
    pid: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    description: z.string(),
    cid:z.string(),
    inventory:z.number()
})

export const productArraySchema = z.array(productSchema)

export type Product = z.infer<typeof productSchema>


