import {  request } from "./core";
import { categorySchema } from "../models/category";
import { queryOptions, useQuery } from "@tanstack/react-query";

const baseQueryKey = ["category"];

type OnError = (error: unknown) => undefined;

const queryFn = (cid: string,onError?:OnError) => request({
  path: `categories/${cid}`,
  schema: categorySchema,
  onError,
  
});


export const singleCategoryQueryOptions = (cid: string,onError?:OnError) => queryOptions({
  queryKey: [...baseQueryKey, cid],
  queryFn: () => queryFn(cid,onError),
});



export function useSingleCategoryQuery(cid: string,onError?:OnError) {

  const option = singleCategoryQueryOptions(cid,onError);
  return useQuery(option);
}
