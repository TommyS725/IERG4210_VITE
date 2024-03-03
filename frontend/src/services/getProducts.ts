import { request } from "./core";
import {  simplifiedProductSchema } from "../models/products";
import { queryOptions, useQuery } from "@tanstack/react-query";

const baseQueryKey = ["products"];

const queryFn = (cid?: string) => request({
  path: "products",
  params: { cid },
  schema: simplifiedProductSchema.array(),
});

export const allProductsQueryOptions = (cid?: string) => {
  const queryKey = cid ? [...baseQueryKey, cid] : baseQueryKey;
  return queryOptions({
    queryKey,
    queryFn: () => queryFn(cid),
  });
}

export function useProductsQuery(cid?: string) {
  const option = allProductsQueryOptions(cid);
  return useQuery(option);
}
