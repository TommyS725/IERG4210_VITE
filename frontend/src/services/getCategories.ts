import { useQuery } from "react-query";
import { request } from "./core";

import { categoryArraySchema } from "../models/category";

export const queryKey = "categories" as const;

export const getAllCategories = () => {
  return useQuery(
    queryKey, 
    async () => {
        const data = await request({
            path: "categories",
        });
        // console.log(data);
        return categoryArraySchema.parse(data);
    },
    );

};
