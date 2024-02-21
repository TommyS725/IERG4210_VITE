import { useQuery } from "react-query";
import { request } from "./core";
import { categorySchema } from "../models/category";


const baseQueryKey = ['category'] 


export function useSingleCategoryQuery(cid:string) {
   if(!cid){
    console.error('useSingleCategoryQuery: cid is required');
   }
  const queryKey = [...baseQueryKey, cid];
  return useQuery(
    queryKey,
    async ()=>{
        const data = await request({
            path: `categories/${cid}`,
        });
        // console.log(data);
        return categorySchema.parse(data);
    }
  )
}