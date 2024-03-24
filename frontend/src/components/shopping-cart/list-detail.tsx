import { FC, useEffect, useState } from "react";
import { CartItem } from "../../models/cart";
import { Link } from "@tanstack/react-router";
import { ShoppingCartContextType } from "../../context/ShoppingCartContext";




const ListSeperater = () => <hr className=" my-2 mx-2 border-t-gray-400" />;

type ListDetailProps = {
    context:ShoppingCartContextType
}

type CartQuantity = Number[];

const ListDetail:FC<ListDetailProps> = (props) => {
    const { cart,  removeItem, updateItem } = props.context;
    const [cartQuantity, setCartQuantity] = useState<CartQuantity>(
        cart.map((item) => item.quantity)
    );
    const lenDigits = cart.length ? Math.floor(Math.log10(cart.length) + 1) : 0;


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
        item: CartItem,
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
        //* Inventory check is done on server side
        // if (newQuantity > item.inventory) {
        //     window.alert(`Not enough stock for ${item.name}!`);
        //     event.target.value = item.quantity.toString();
        //     return;
        // }
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



    useEffect(() => {
        setCartQuantity(cart.map((item) => item.quantity));
    }, [cart]);



    return <ul className=" max-h-[50vh] overflow-auto p-1">
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
                    <div className="flex overflow-auto  gap-4 text-center px-2">
                        <div>
                            {index + 1}.
                        </div>
                        <div className="grow grid grid-cols-3 gap-2">
                            <Link
                                className=" text-nowrap  overflow-auto hover:underline"
                                to="/products/$pid"
                                params={{ pid: item.pid }}
                            >
                                {item.name}
                            </Link>
                            <input
                                inputMode="numeric"
                                type="number"
                                min={0}
                                value={String(cartQuantity[index] ?? item.quantity)}
                                size={item.quantity.toString().length}
                                className=" bg-white bg-opacity-15 rounded-lg text-center focus:outline-white  focus:outline-1 focus:bg-slate-400 "
                                onChange={(e) => editInput(index, e)}
                                onBlur={(e) => handleEditQuantity(item, e)}
                            />
                            <span className=" text-end mr-1">@${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    {index + 1 === cart.length ? null : <ListSeperater />}
                </li>
            );
        })}
    </ul>
}

export default ListDetail;