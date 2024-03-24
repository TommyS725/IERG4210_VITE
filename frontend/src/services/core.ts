/* eslint-disable  @typescript-eslint/no-explicit-any */
import { notFound } from "@tanstack/react-router";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { z } from "zod";


const API_VERSION = "v1";
export const API_URL = `/api/${API_VERSION}/`;


// const isDev = process.env.NODE_ENV === "development";

type RequestConfig<T> = Omit<AxiosRequestConfig, "url" | "method"> & {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => T;
};


export const request = async <T>(config: RequestConfig<T>):Promise<T> => {
  const method = config.method || "GET";
  const url = `${API_URL}${config.path}`;
  // console.log(url);
  try {
    // Simulate network delay in development
    // isDev && await new Promise(res=>setTimeout(res,200));
    const response = await axios.request({
        ...config,
        method,
        url,
      });
      const parse = config.schema.safeParse(response.data);
      if (!parse.success) {
        throw new Error(`Unable to parse data from ${url}.`);
      }
      if (config.onSuccess) {
        config.onSuccess(parse.data);
      }
      return parse.data;
  } catch (error) {
    if (config.onError) {
      return config.onError(error);
    }
    console.error("Request failed", error);
    if(isAxiosError(error) ){
      if(error.response?.status === 404){
        throw notFound();
      }
      throw new Error(`Request to ${url} failed with status ${error.response?.status}.`);
    }
    throw error;
  }
  
};
