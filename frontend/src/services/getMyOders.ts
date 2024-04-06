import { useQuery } from "@tanstack/react-query";
import { request,  } from "./core";
import { userOrderSchema } from "../models/userOrder";
// import { orderDetailSchema } from "../models/orderDetail";


const queryKey = "my-orders";


export function useMyOrdersQuery() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: ()=>request({
        path: 'orders/my-orders',
        schema:userOrderSchema.array(),
    }),

  });
}