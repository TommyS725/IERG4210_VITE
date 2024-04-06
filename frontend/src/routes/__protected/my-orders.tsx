import { FC } from "react";
import { useMyOrdersQuery } from "../../services/getMyOders";
import { Loader2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEditTitle } from "../../utils/title";
import OrderCard from "../../components/orders/orderCard";




const MyOrdersPage: FC = () => {
    const { data: orders, isLoading } = useMyOrdersQuery();
    useEditTitle(["My Orders"]);


    if (isLoading) {
        return <main className='w-full min-h-[75vh] grid justify-center items-center'>
            <Loader2 className="animate-spin  size-60 place-self-center " />
        </main>
    }

    return (<main className=" grid items-center m-4 mx-6 text-slate-900 ">

        <h1 className=" pl-4 text-4xl font-bold">My Recent Orders</h1>
        <hr className=" border-b-4 border-slate-900 mt-2 mb-10" />
        {orders?.length === 0 &&<p className=" italic text-center text-4xl text-neutral-700 translate-y-[30vh]">No Order Record</p>}
        {
            !!orders && orders.length >0 && <ul className="flex flex-col space-y-16  mb-4">
               { orders.map((order) => <OrderCard    key={order.UUID} order={order} />)}
            </ul>
        }
    </main>)
}

export const Route = createFileRoute("/__protected/my-orders")({
    component: MyOrdersPage,
})