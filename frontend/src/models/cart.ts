import { z } from "zod";
import { productSchema } from "./product";

const pidSchema = productSchema.shape.pid;
const qunaitySchema = z.number().int().positive();
const cartStorageEntrySchema = z.tuple([pidSchema, qunaitySchema]);


export const cartStorageSchema = z.array(cartStorageEntrySchema);

export const cartItemSchema = productSchema.pick({ pid: true, name: true, price: true })
.extend({ quantity: qunaitySchema });

export const shoppingCartSchema = z.array(cartItemSchema);

export type CartStorage = z.infer<typeof cartStorageSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShoppingCart = z.infer<typeof shoppingCartSchema>;