/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { FC, useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";





const OrderSuccess: FC = () => {
    const [count, setCount] = useState(5);
    const {clearCart,cart,isReady} = useShoppingCart();


    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    },[]);

    useEffect(() => {
        if(cart.length !== 0 && isReady){
            clearCart();
        }
    }, [isReady]);


    if (count <= 0) {
        return <Navigate to='/' />
    }


    return <main className='w-full min-h-[75vh] grid justify-center items-center'>
        <div className=' container border-2 border-slate-700  max-h-[56rem] self-center rounded-3xl p-8 shadow-xl min-h-[35vh] min-w-[50vw] text-slate-900'>
            <h1 className='text-3xl text-center font-bold'>Order Success</h1>
            <hr className='mt-4  mb-4 border-2 border-neutral-900' />
            <p className='text-center text-xl font-medium mb-4'>Thank you for shopping with us. </p>
            <p className='text-center text-lg'> Your order has been placed successfully. Redirecting to home page in
                {" "}<span className=" font-semibold">{count}</span> seconds</p>
            <p className='text-center text-lg'>Click{" "}
                <Link to={'/'}
                    className="text-blue-500 hover:underline"
                >here</Link>
                {" "}to go back immediately</p>
        </div>

    </main>
}


export const Route = createFileRoute('/order-success')({
    component: OrderSuccess
})
