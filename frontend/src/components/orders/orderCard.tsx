import { FC } from "react";
import { UserOrder } from "../../models/userOrder";


type Props ={
    order: UserOrder   ;

}

const OrderCard:FC<Props> = (props) => {
    const {order} = props;
    const {UUID,createdAt,orderDetails} = order;
    const purchaseUnit = orderDetails.purchase_units[0];
    const {amount,items} = purchaseUnit;


    return (
        <li className="  container border-2 border-neutral-300  w-full min-h-96 max-h-[56rem] overflow-y-auto self-center rounded-3xl p-8 shadow-xl">
            <p className=" text-xl  font-medium">Order at: 
                <span className="ml-4 text-2xl font-medium">{createdAt.toLocaleDateString()}</span>
                <span className="ml-2 text-2xl font-medium"> {createdAt.toLocaleTimeString().slice(0,5)}</span>
            </p>
            <hr className=" border-b-2 my-3 mb-6 border-slate-900"/>
            <p className=" text-lg mt-4 font-medium">Order ID:
                <span className="ml-4 text-xl font-medium">{UUID}</span>
            </p>
            <p className=" text-lg mt-4 font-medium">Total amount:
                <span className="ml-4 text-xl font-medium">{amount.currency_code} {amount.value} </span>
            </p>

            <p className=" text-xl mt-4 mb-2  font-medium">Order Details</p>
            <table className=" border-collapse min-w-[80%] ">
            <thead >
                <tr className=" h-8 border-b-2 border-b-slate-900 " >
                     <th className="pl-4">#</th>
                    <th>Item Name</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price ({amount.currency_code})</th>
                </tr>
            </thead>
            <tbody >
                {items.map((item, index) => (
                    <tr key={UUID+'-'+index} className=" h-10 text-lg" >
                        <td className="pl-4">{index+1}</td>
                        <td className=" overflow-x-auto">{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.unit_amount.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
        </li>
    )
}



export default OrderCard;