import { request } from "./core";
import {  simplifiedProductSchema } from "../models/products";
import { infiniteQueryOptions,useInfiniteQuery } from "@tanstack/react-query";

const baseQueryKey = ["products"];


type InfiniteProductsQueryConfig = {
    cid?: string;
    pageSize?: number;
};

const defaultConfig ={
    pageSize: 20,

} satisfies InfiniteProductsQueryConfig;




//pageParam is the last item in the current page, which is ulid, data 
const queryFn = (config:InfiniteProductsQueryConfig,pageParam?:string) => request({
  path: "products",
  params: {
    ...defaultConfig,
    ...config,
    cursor: pageParam,
  },
  schema:simplifiedProductSchema.array(),
});

export const infiniteProductsQueryOptions = (config:InfiniteProductsQueryConfig) => {
    const queryKey = config.cid ? [...baseQueryKey, config.cid] : baseQueryKey;
    return infiniteQueryOptions({
        queryKey,
        queryFn:({pageParam=undefined})=>queryFn(config,pageParam),
        getNextPageParam:(lastPage)=>lastPage.at(-1)?.pid,
        initialPageParam:undefined as string|undefined
    });
}

export function useInfiniteProductsQuery(config:InfiniteProductsQueryConfig) {
  const option = infiniteProductsQueryOptions(config);
  return useInfiniteQuery(option);
}