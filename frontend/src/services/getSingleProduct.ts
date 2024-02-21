import { useQuery } from "react-query";
import { request } from "./core";
import { productSchema } from "../models/products";


const baseQueryKey = ['product'];


export function useSingleProductQuery(pid:string) {
  const queryKey = [...baseQueryKey, pid];
  return useQuery(
    queryKey,
    async ()=>{
        const data = await request({
            path: `products/${pid}`,
        });
        return productSchema.parse(data);
    }
  )
}