import {z}  from 'zod';
import { orderDetailSchema } from './orderDetail';

export const userOrderSchema= z.object({
    UUID: z.string(),
    createdAt:z.coerce.date(), // timestamp
    username: z.string(),
    orderDetails:orderDetailSchema,
});

export type UserOrder = z.infer<typeof userOrderSchema>


// export type TransFromedUserOrder = Omit<UserOrder,'orderDetails'> & {
//     orderDetails:OrderDetail
// }