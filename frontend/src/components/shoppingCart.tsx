import { Link } from "@tanstack/react-router";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../models/products";
import { ShoppingCart as CartIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";

type Item = Product & { quantity: number };

const DIGIT_TO_SHOW = 1 as const; //decimal places to show in total
const rounder = 10 ** DIGIT_TO_SHOW;

const ListSeperater = () => <hr className=" my-2 mx-2 border-t-gray-400" />;

type CartQuantity = Number[];

const ShoppingList: FC = () => {
  const { cart, updateItem, removeItem, totalAmount } = useShoppingCart();
  const [cartQuantity, setCartQuantity] = useState<CartQuantity>(
    cart.map((item) => item.quantity)
  );
  const lenDigits = cart.length ? Math.floor(Math.log10(cart.length) + 1) : 0;

  const roundedTotal = (Math.round(totalAmount * rounder) / rounder).toFixed(
    DIGIT_TO_SHOW
  );

  const editInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    if (isNaN(value)) {
      event.target.value = cartQuantity[index].toString();
      return;
    }
    setCartQuantity((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1),
    ]);
  };

  const handleEditQuantity = (
    item: Item,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const inputVal = event.target.value;
    // console.log(item.pname, inputVal);
    const newQuantity = +inputVal;
    // console.log(newQuantity);
    if (isNaN(newQuantity)) {
      event.target.value = item.quantity.toString();
      return;
    }
    if (newQuantity > item.inventory) {
      window.alert(`Not enough stock for ${item.name}!`);
      event.target.value = item.quantity.toString();
      return;
    }
    if (newQuantity < 0) {
      window.alert(`Invalid quantity for ${item.name}!`);
      event.target.value = item.quantity.toString();
      return;
    }
    if (newQuantity === 0) {
      removeItem(item.pid);
      return;
    }
    updateItem(item.pid, newQuantity);
  };

  const checkOut = () => {
    const transaction = cart.map((item) => {
      return { pid: item.pid, quantity: item.quantity };
    });
    if (!transaction.length) return;
    window.alert(`Transaction: ${JSON.stringify(transaction)}`);
  };

  useEffect(() => {
    setCartQuantity(cart.map((item) => item.quantity));
  }, [cart]);

  return (
    <>
      <div
        className={`p-3 bg-slate-800 text-zinc-300 gap-8 min-w-96 shadow-xl
        hidden group-hover/scart:block group-hover/scart:absolute 
        top-6 right-3 rounded-md`
        }
      >
        <p className=" font-medium text-center text-white">Shopping List </p>
        <hr className=" my-2" />
        {!!cart.length ? (
          <ul className=" max-h-[50vh] overflow-auto">
            <li className="flex  text-center px-2">
              <span>
                {Array(lenDigits + 2)
                  .fill("\u00a0")
                  .join("")}
              </span>
              <div className="grow grid grid-cols-3 gap-2">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
              </div>
            </li>
            <ListSeperater />
            {cart.map((item, index) => {
              return (
                <li key={item.pid}>
                  <div className="flex overflow-scroll gap-4 text-center px-2">
                    <div>
                      {index + 1}.
                    </div>
                    <div className="grow grid grid-cols-3 gap-2">
                      <Link 
                      className=" text-nowrap overflow-x-auto hover:underline"
                      to="/products/$pid"
                      params={{ pid: item.pid }}
                      >
                        {item.name}
                        </Link>
                      <input
                        inputMode="numeric"
                        type="number"
                        value={String(cartQuantity[index] ?? item.quantity)}
                        size={item.quantity.toString().length}
                        className=" bg-white bg-opacity-15 rounded-lg text-center focus:outline-white  focus:outline-1 focus:bg-slate-400 "
                        onChange={(e) => editInput(index, e)}
                        onBlur={(e) => handleEditQuantity(item, e)}
                      />
                      <span>@${item.price}</span>
                    </div>
                  </div>
                  {index + 1 === cart.length ? null : <ListSeperater />}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center">Nothing in cart!</div>
        )}
        <hr className=" my-2" />
        <div className="grid grid-cols-2 mx-2 items-center">
          <span>
            Total:{"\u00a0\u00a0"}${roundedTotal}
          </span>
          <button
            className="border-2 py-1 border-blue-700 bg-blue-500 text-white   rounded-2xl hover:bg-opacity-85 hover:border-sky-400 hover:ring-2 ring-sky-400 font-bold hover:font-extrabold "
            onClick={checkOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

const ShoppingCart: FC = () => {
  const { cart } = useShoppingCart();
  const showCart = cart.length > 0;
  return (
    <>
      <div className=" relative group/scart">
        <div className=" flex hover:bg-slate-600 p-2 rounded-lg">
          <div className=" relative">
            <CartIcon size={28} color="white " />
            {showCart && (
              <div className="absolute   -top-2  -right-3 text-center text-white font-bold text-md  w-[26px] h-[26px]  rounded-full bg-red-600">
                {cart.length}
              </div>
            )}
          </div>
          {/* {showCart&&<div className="text-white text-lg font-medium ml-5 underline-offset-4 underline">${totalAmount.toFixed(1)}</div>} */}
        </div>
        <ShoppingList />
      </div>
    </>
  );
};

export default ShoppingCart;
