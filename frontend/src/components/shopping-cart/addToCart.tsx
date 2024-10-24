import { FC } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Minus, Plus } from "lucide-react";
import { SimplifiedProduct } from "../../models/product";
import Button from "../Button";

type AddToCartProps = {
  product: SimplifiedProduct,
  text: "full" | "short";
};

const AddToCart: FC<AddToCartProps> = ({ product, text = "full" }) => {
  const { addItem, cart, updateItem, removeItem, isReady } = useShoppingCart();
  const item = cart.find((item) => item.pid === product.pid);
  const inCart = !!item;

  const handleAdd = () => {
    const quantityNow = item?.quantity ?? 0;
    const newQuantity = quantityNow + 1;
    if (newQuantity > product.inventory) {
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
        <Button disabled={!isReady} onClick={handleMinues}>

        <Minus className=" hover:text-gray-700" />
        </Button>
            <span className=" cursor-default"> {text==="full"&&"In cart: "}<span className=" font-semibold">{item.quantity}</span></span>
        <Button onClick={handleAdd}  disabled={!isReady}>  
          <Plus className=" hover:text-gray-700" />
        </Button>
        </div>
    </>
  }

// not in cart
if(text==="short")
    return <Button
    className=" flex justify-center border-2 border-gray-700 rounded-full md:rounded-2xl   hover:ring-1 ring-gray-700 hover:bg-blue-200 "
    onClick={handleAdd}
    disabled={!isReady}
  >
    <div className=" md:py-1  flex gap-1">
    <Plus className= " md:-ml-1" />
    <span className="  md:inline-block hidden">{"Add"}</span>
    </div>
  </Button>

// text = full
    return <Button
    className=" h-fit w-fit flex gap-1 py-1 pl-1 pr-3 border-2 border-sky-700 bg-blue-950 text-white   rounded-2xl hover:bg-opacity-70 hover:border-sky-600 hover:ring-2 ring-border-sky-600 hover:font-semibold"
    onClick={handleAdd}
    disabled={!isReady}
  >
    <Plus />
    {"Add to cart"}
  </Button>
};


export default AddToCart;