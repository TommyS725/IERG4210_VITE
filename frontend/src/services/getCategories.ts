import { request } from "./core";

import { categoryArraySchema } from "../models/category";
import { useQuery,queryOptions } from "@tanstack/react-query"

export const queryKey = ["categories" ] as const;
const queryFn = () => request({
  path: "categories",
  schema: categoryArraySchema,
});

export const allCategoriesQueryOptions = queryOptions({
  queryKey,
  queryFn,
});


export const getAllCategories = () => {
  const option = allCategoriesQueryOptions;
  return useQuery(option);
};
