// wriet a context for shopping cart
import { Product } from "../models/products";
import  {  ReactNode, useState,createContext,useContext, Dispatch } from "react";

export type CartItem = Product & { quantity: number };

type ShoppingCartContextType = {
    cart: CartItem[];
    totalAmount: number;
    addItem: (product: Product, quantity: number) => void;
    removeItem: (pid: string) => void;
    updateItem: (pid: string, quantity: number) => void;
    clearCart: () => void;
    setCart: Dispatch<React.SetStateAction<CartItem[]>>;
};

type ShoppingCartProviderProps = {
    children: ReactNode;
    initialCart?: CartItem[];
};


const ShoppingCartContext = createContext<ShoppingCartContextType|null>(null)

export function ShoppingCartContextProvider({ children, initialCart = [] }: ShoppingCartProviderProps){
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

    const addItem = (product:Product,quantity:number) => {
        const item = { ...product, quantity };
        const index = cart.findIndex((i) => i.pid === item.pid);
        if (index === -1) {
            setCart([...cart, item]);
        } else {
            const newCart = [...cart];
            newCart[index].quantity += item.quantity;
            setCart(newCart);
        }
    };

    const removeItem = (pid: string) => {
        const newCart = cart.filter((item) => item.pid !== pid);
        setCart(newCart);
    };

    const updateItem = (pid: string, quantity: number) => {
        const index = cart.findIndex((item) => item.pid === pid);
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <ShoppingCartContext.Provider value={{ cart, addItem, removeItem, updateItem, clearCart ,totalAmount,setCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );

}


export const useShoppingCart = () =>{
    const context = useContext(ShoppingCartContext);
    if (context==undefined) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context;
}