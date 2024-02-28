import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { CartStorage, ShoppingCart, cartStorageSchema } from "../models/cart";
import { Product } from "../models/products";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useInitCartQuery } from "../services/initCart";


const DIGIT_TO_SHOW = 2 as const; //decimal places to show in total

const rounder = 10 ** DIGIT_TO_SHOW;




export type ShoppingCartContextType = {
  cart: ShoppingCart;
  totalAmount: number;
  roundedTotal: string;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (pid: string) => void;
  updateItem: (pid: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  isReady: boolean;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

const initialStorage: CartStorage = [];

const initialCart: ShoppingCart = [];



export function ShoppingCartContextProvider({
  children,
}: ShoppingCartProviderProps) {
  const [cart, setCart] = useState<ShoppingCart>(initialCart);
  const [cartStorage, setCartStorage] = useLocalStorage(
    "cart",
    cartStorageSchema,
    initialStorage
  );
  const { isError, isLoading} = useInitCartQuery(cartStorage,data=>{
    // console.log("data",data);
    setCart(data);
  });


  const saveCartToStorage = useCallback(
    (cart: ShoppingCart) => {
      const storage: CartStorage = cart.map((item) => [item.pid, item.quantity]);
      setCartStorage(storage);
      return
    },
    [setCartStorage]
  );

  const totalAmount = useMemo(() => cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ), [cart])

  const roundedTotal = useMemo(() => (Math.round(totalAmount * rounder) / rounder).toFixed(
    DIGIT_TO_SHOW
  ), [totalAmount])

  const isReady = !isLoading && !isError 
  // && data !== undefined;

  const addItem = (product: Product, quantity: number) => {
    if (!isReady) return;
    const item = { ...product, quantity };
    const index = cart.findIndex((i) => i.pid === item.pid);
    if (index === -1) {
      const newCart = [...cart, item];
      setCart(newCart);
      saveCartToStorage(newCart);
    } else {
      const newCart = [...cart];
      newCart[index].quantity += item.quantity;
      setCart(newCart);
      saveCartToStorage(newCart);
    }
  }

  const removeItem = (pid: string) => {
    if (!isReady) return;
    const newCart = cart.filter((item) => item.pid !== pid);
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const updateItem = (pid: string, quantity: number) => {
    if (!isReady) return;
    const index = cart.findIndex((item) => item.pid === pid);
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    if (!isReady) return;
    setCart([]);
    saveCartToStorage([]);
  };

  return (
    <ShoppingCartContext.Provider value={
      {
        cart,
        totalAmount,
        roundedTotal,
        isLoading,
        isReady,
        addItem,
        removeItem,
        updateItem,
        clearCart,
      }
    }>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context == undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};
