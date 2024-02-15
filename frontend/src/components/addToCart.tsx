import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Minus, Plus } from "lucide-react";
import { Product } from "../models/products";

type AddToCartProps = {
  product: Product;
  text: "full" | "short";
};

const AddToCart: FC<AddToCartProps> = ({ product, text = "full" }) => {
  const { addItem, cart, updateItem, removeItem } = useShoppingCart();
  const item = cart.find((item) => item.pid === product.pid);
  const inCart = !!item;

  const handleAdd = () => {
    const quantityNow = item?.quantity ?? 0;
    const newQuantity = quantityNow + 1;
    if (newQuantity > product.remaining) {
      window.alert("Not enough stock!");
      return;
    }
    if (!inCart) {
      addItem(product, 1);
      return;
    }
    updateItem(product.pid, newQuantity);
  };

  const handleMinues = () => {
    if (!inCart) return;
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      removeItem(product.pid);
      return;
    }
    updateItem(product.pid, newQuantity);
  };
  
  if(inCart){
    return <>
         <div
          className=" w-fit flex gap-2 p-1 border-2 border-blue-700 bg-blue-500 text-white   rounded-2xl "
        >
        <button onClick={handleMinues}>

        <Minus className=" hover:text-gray-700" />
        </button>
            <span className=" cursor-default"> {text==="full"&&"In cart: "}<span className=" font-semibold">{item.quantity}</span></span>
        <button onClick={handleAdd}>
          <Plus className=" hover:text-gray-700" />
        </button>
        </div>
    </>
  }

// not in cart
if(text==="short")
    return <button
    className=" flex gap-1 py-1 pl-1 border-2 border-gray-700 rounded-2xl  hover:ring-1 ring-gray-700 hover:bg-blue-200 "
    onClick={handleAdd}
  >
    <Plus />
    {"Add"}
  </button>

// text = full
    return <button
    className=" h-fit w-fit flex gap-1 py-1 pl-1 pr-3 border-2 border-sky-700 bg-blue-950 text-white   rounded-2xl hover:bg-opacity-70 hover:border-sky-600 hover:ring-2 ring-border-sky-600 hover:font-semibold"
    onClick={handleAdd}
  >
    <Plus />
    {"Add to cart"}
  </button>
};


export default AddToCart;