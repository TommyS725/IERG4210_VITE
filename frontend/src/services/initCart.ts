import { request } from "./core";
import { productSchema } from "../models/products";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ShoppingCart, CartStorage } from "../models/cart";

const baseQueryKey = ["shopping-cart", "init"];

const initCartResponseSchema = productSchema
  .pick({
    pid: true,
    name: true,
    price: true,
  })
  .array();

type CallBack  = (data: ShoppingCart) => void;

const queryFn = (
  storage: CartStorage,
  onSuccess: CallBack
) =>
  request({
    path: `shopping-cart/init`,
    schema: initCartResponseSchema,
    params: {
      pid: storage.map(([pid]) => pid),
    },
  }).then((data) => {
    const transformed = storage
      .map(([pid, quantity]) => {
        const productD = data.find((d) => d.pid === pid);
        return {
          pid,
          name: productD?.name ?? "",
          price: productD?.price ?? -1,
          quantity,
        };
      })
      .filter((d) => d.price >= 0) satisfies ShoppingCart;
    onSuccess(transformed);
    return transformed;
  });

export const initCaertQueryOptions = (storage: CartStorage,onSuccess: CallBack) => {
  return queryOptions({
    queryKey: baseQueryKey,
    queryFn: () => queryFn(storage,onSuccess),
  });
};

export function useInitCartQuery(storage: CartStorage,onSuccess: CallBack) {
  const option = initCaertQueryOptions(storage,onSuccess);
  return useQuery(option);
}
