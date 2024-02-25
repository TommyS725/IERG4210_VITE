import { notFound } from "@tanstack/react-router";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { z } from "zod";

const API_VERSION = "v1";
const API_URL = `/api/${API_VERSION}/`;

type RequestConfig<T> = Omit<AxiosRequestConfig, "url" | "method"> & {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  schema: z.ZodSchema<T>;
};

export const request = async <T>(config: RequestConfig<T>) => {
  const method = config.method || "GET";
  const url = `${API_URL}${config.path}`;
  try {
    const response = await axios.request({
        ...config,
        method,
        url,
      });
      const parse = config.schema.safeParse(response.data);
      if (!parse.success) {
        throw new Error(`Unable to parse data from ${url}.`);
      }
      return parse.data;
  } catch (error) {
    if(isAxiosError(error) ){
      if(error.response?.status === 404){
        throw notFound();
      }
      throw new Error(`Request to ${url} failed with status ${error.response?.status}.`);
    }
    throw error;
  }
  
};
