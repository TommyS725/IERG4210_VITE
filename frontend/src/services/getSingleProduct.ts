import { request } from "./core";
import { productSchema } from "../models/product";
import { queryOptions,useQuery } from "@tanstack/react-query";

const baseQueryKey = ["product"];


const queryFn = (pid:string) =>request(
  {
    path: `products/${pid}`,
    schema: productSchema,
  });


export const  singleProductQueryOptions = (pid: string) => queryOptions({
  queryKey: [...baseQueryKey, pid],
  queryFn: ()=>queryFn(pid),
});


export function  useSingleProductQuery(pid: string){
  const option = singleProductQueryOptions(pid);
  return useQuery(option);
}