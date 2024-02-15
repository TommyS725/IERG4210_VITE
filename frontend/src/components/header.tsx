import { Link } from "@tanstack/react-router";
import { FC } from "react";
import ShoppingCart from "./shoppingCart";






const Header:FC =()=>{


    return(
        <header className=" min-w-max bg-blue-950  flex p-3 sticky top-0  items-center">
            <Link to="/" className=" font-bold font-mono text-xl text-white hover:bg-slate-700 bg-opacity-25 p-2 rounded-xl  ">
                Shopping.com
            </Link>
            <div className="grow"/>
            <ShoppingCart/>
            <div className=" mr-10"/>
        </header>
    )
}

export default Header;