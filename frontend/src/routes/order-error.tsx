import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { FC, useEffect, useState } from "react";





const OrderError: FC = () => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    },[]);

    if (count <= 0) {
        return <Navigate to='/' />
    }


    return <main className='w-full min-h-[75vh] grid justify-center items-center'>
        <div className=' container border-2 border-slate-700  max-h-[56rem] self-center rounded-3xl p-8 shadow-xl min-h-[35vh] min-w-[50vw] text-slate-900'>
            <h1 className='text-3xl text-center font-bold'>Order Error</h1>
            <hr className='mt-4  mb-8 border-2 border-neutral-900' />
            <p className='text-center text-lg'>There was an error in placing your order. Redirecting to home page in
                {" "}<span className=" font-semibold">{count}</span> seconds</p>
            <p className='text-center text-lg'> Please contact our support team for further assistance</p>
            <p className='text-center text-lg'>Click{" "}
                <Link to={'/'}
                    className="text-blue-500 hover:underline"
                >here</Link>
                {" "}to go back immediately</p>
        </div>

    </main>
}


export const Route = createFileRoute('/order-error')({
    component: OrderError
})
