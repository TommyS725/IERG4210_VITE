import { request } from "./core";
import { userProfileSchema } from "../models/userProfile";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const baseQueryKey = ["profile"];

const queryFn = () => request({
  path: "auth/profile",
  schema: userProfileSchema,
  onError: (error) => {
     if(!(error instanceof AxiosError)) throw error;
     if(error.response?.status === 404) return null;
    throw error;
  },
});

export const getProfileQueryOptions = () => {
  const queryKey = baseQueryKey;
  return queryOptions({
    queryKey,
    queryFn: () => queryFn(),
  });
}

export function useProfileQuery() {
  const option = getProfileQueryOptions();
  return useQuery(option);
}
