import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { CartStorage, ShoppingCart, cartStorageSchema } from "../models/cart";
import { SimplifiedProduct } from "../models/product";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useInitCartQuery } from "../services/initCart";


const DIGIT_TO_SHOW = 2 as const; //decimal places to show in total

const rounder = 10 ** DIGIT_TO_SHOW;




export type ShoppingCartContextType = {
  cart: ShoppingCart;
  totalAmount: number;
  roundedTotal: string;
  addItem: (product: SimplifiedProduct, quantity: number) => void;
  removeItem: (pid: string) => void;
  updateItem: (pid: string, quantity: number) => void;
  getCart: () => ShoppingCart;
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

const storageKey ='cart' as const;

// eslint-disable-next-line react-refresh/only-export-components
export function getCartStorage(): CartStorage {
  try {
    const item = window.localStorage.getItem(storageKey);
    if (!item) {
      return initialStorage;
    }
    const jsonItem = JSON.parse(item);
    return cartStorageSchema.parse(jsonItem);
  } catch (error) {
    window.localStorage.setItem(storageKey, JSON.stringify(initialStorage));
    return initialStorage;
  }
}



export function ShoppingCartContextProvider({
  children,
}: ShoppingCartProviderProps) {
  const [cart, setCart] = useState<ShoppingCart>(initialCart);
  const [cartStorage, setCartStorage] = useLocalStorage(
    storageKey,
    cartStorageSchema,
    initialStorage
  );
  const {data, isError, isLoading} = useInitCartQuery(cartStorage,data=>{
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

  const updateCart =(newCart: ShoppingCart) => {
    setCart([...newCart]);
    saveCartToStorage(newCart);
  }

  const totalAmount = useMemo(() => cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ), [cart])

  const roundedTotal = useMemo(() => (Math.round(totalAmount * rounder) / rounder).toFixed(
    DIGIT_TO_SHOW
  ), [totalAmount])

  const isReady = !isLoading && !isError && data !== undefined;


  const addItem = (product: SimplifiedProduct, quantity: number) => {
    // console.log("addItem",product,quantity)
    if (!isReady) return;
    const item = { ...product, quantity };
    const index = cart.findIndex((i) => i.pid === item.pid);
    let newCart = cart;
    if (index === -1) {
       newCart = [...cart, item];
    } else {
      newCart[index].quantity += item.quantity;
    }
    // console.log("newCart",newCart)
    updateCart(newCart);
  }

  const removeItem = (pid: string) => {
    if (!isReady) return;
    const newCart = cart.filter((item) => item.pid !== pid);
    updateCart(newCart);
  };

  const updateItem = (pid: string, quantity: number) => {
    if (!isReady) return;
    const index = cart.findIndex((item) => item.pid === pid);
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    updateCart(newCart);
  };

  const getCart = () => {
    if (!isReady) return [];
    return cart;
  }

  const clearCart = () => {
    if (!isReady) return;
    updateCart([]);
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
        getCart,
        clearCart,
      }
    }>
      {children}
    </ShoppingCartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context == undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};
