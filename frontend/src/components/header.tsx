import { Link } from "@tanstack/react-router";
import { FC } from "react";
import ShoppingCart from "./shopping-cart/shoppingCart";
import UserProfile from "./userProfile";



const ignore_cart_routes = ['login','reset_password']


const TopHeader:FC =()=>{
    const showCart = !ignore_cart_routes.includes(window.location.pathname.split('/')[1])

    return(
        <header className=" min-w-max bg-blue-950  flex p-3 sticky top-0  justify-between shadow-lg pr-10">
            <Link to="/" className=" font-bold font-mono text-xl text-white hover:underline underline-offset-4 p-2 rounded-xl  ">
                Shopping Demo
            </Link>
            <div className=" items-end flex flex-wrap space-x-3">
            {   
                showCart && <ShoppingCart/>
            }
            <UserProfile/>
            </div>
        </header>
    )
}

export default TopHeader;