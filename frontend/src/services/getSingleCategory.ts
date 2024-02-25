import {  request } from "./core";
import { categorySchema } from "../models/category";
import { queryOptions, useQuery } from "@tanstack/react-query";

const baseQueryKey = ["category"];

const queryFn = (cid: string) => request({
  path: `categories/${cid}`,
  schema: categorySchema,
});


export const singleCategoryQueryOptions = (cid: string) => queryOptions({
  queryKey: [...baseQueryKey, cid],
  queryFn: () => queryFn(cid),
});



export function useSingleCategoryQuery(cid: string) {

  const option = singleCategoryQueryOptions(cid);
  return useQuery(option);
}
