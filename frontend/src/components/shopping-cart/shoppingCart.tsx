import { ShoppingCartContextType, useShoppingCart } from "../../context/ShoppingCartContext";
import { ShoppingCart as CartIcon, Loader2 } from "lucide-react";
import { FC } from "react";
import ListDetail from "./list-detail";
import Button from "../Button";

type ShoppingListProps = {
  context:ShoppingCartContextType
}

const ShoppingList: FC<ShoppingListProps> = ({context}) => {
  const { isLoading,cart ,roundedTotal,isReady,clearCart} = context;
  const showContent =!isLoading && cart.length > 0 
  const checkOut = () => {
    if (isLoading) {
      return
    }
    const transaction = cart.map((item) => {
      return { pid: item.pid, quantity: item.quantity };
    });
    if (!transaction.length) return;
    window.alert(`Transaction: ${JSON.stringify(transaction)}`);
  };


  return (
    <>
      <div
        className={`p-3 bg-slate-800 text-zinc-300 gap-8 min-w-96 shadow-xl
         hidden group-hover/scart:block group-hover/scart:absolute 
        top-9 right-0 translate-x-24 rounded-md`
        }
      >
        <p className=" font-medium text-center text-white">Shopping List </p>
        {/* <p> Ready: {isReady?"yes":"no"}</p> */}
        <hr className=" my-2" />
        {/* loading animation */}
        {
          showContent?<ListDetail context={context}/>:
          <div className=" flex justify-center  w-full text-neutral-500 my-1 ">
            {isLoading&&<Loader2 className="  place-self-center size-10 animate-spin "/>}
            {!isLoading&&cart.length===0&&<span>Nothing in cart ...</span>}
          </div>
        }
        <hr className=" my-2" />
        <div className="grid grid-cols-2 mx-2  gap-2">
          <span className=" font-semibold">
            Total:
          </span>
          <span className=" text-end mr-1 font-semibold">
            ${roundedTotal}
          </span>
          <Button className=" text-neutral-300 hover:underline hover:text-red-500 opacity-70 text-start"
          disabled={!isReady || !cart.length}
          onClick={clearCart}
          >
            Clear All
          </Button>
          <Button
            className="border-2 py-1 border-blue-700 bg-blue-500 text-white   rounded-2xl hover:bg-opacity-85 hover:border-sky-400 hover:ring-2 ring-sky-400 font-bold hover:font-extrabold "
            disabled={!isReady || !cart.length}
            onClick={checkOut}
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );
};

const ShoppingCart: FC = () => {
  const context = useShoppingCart();
  const { isReady,cart} = context;
  const cartLen = isReady ? cart.length : 0;
  const showCart = cartLen > 0;
  return (
    <>
      <div className=" relative group/scart">
        <div className=" flex hover:bg-slate-600 hover:opacity-55 p-2 rounded-lg">
          <div className=" relative">
            <CartIcon size={28} color="white " />
            {showCart && (
              <div className="absolute   -top-2  -right-3 text-center text-white font-bold text-md  w-[26px] h-[26px]  rounded-full bg-red-600">
                {cartLen}
              </div>
            )}
          </div>
          {/* {showCart&&<div className="text-white text-lg font-medium ml-5 underline-offset-4 underline">${totalAmount.toFixed(1)}</div>} */}
        </div>
        <ShoppingList context={context} />
      </div>
    </>
  );
};

export default ShoppingCart;
