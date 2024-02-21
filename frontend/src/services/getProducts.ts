import { useQuery } from "react-query";
import { request } from "./core";
import { productArraySchema } from "../models/products";


const baseQueryKey = ['products'];


export function useProductsQuery(cid?:string) {
  const queryKey = cid ? [...baseQueryKey, cid] : baseQueryKey;
  return useQuery(
    queryKey,
    async ()=>{
        const data = await request({
            path: "products",
            params: {cid},
        });
        return productArraySchema.parse(data);
    }
  )
}