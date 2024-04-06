/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { getCartStorage, useShoppingCart } from "../../context/ShoppingCartContext";
import { request } from "../../services/core";
import { OrderDetail, orderDetailSchema } from "../../models/orderDetail";
import type { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js/types/components/buttons.d.ts";
import { FC } from "react";
import { z } from "zod";
import { useUser } from "../../context/UserContext";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";


//paypal client id
const parseClientId = z.string().safeParse(import.meta.env.VITE_PAYPAL_CLIENT_ID);
if (!parseClientId.success) {
    throw new Error("Invalid paypal client id");
}
const clientId = parseClientId.data;



const paypalOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
};




const Btn: FC = () => {
    const { clearCart, cart } = useShoppingCart();
    const { user } = useUser();
    const [{ isPending }] = usePayPalScriptReducer();
    const queryClient = useQueryClient();
    const router = useRouter();



    const isLogged = !!user;
    const errorMessage = isLogged ? "" : "Please login to place order";

    let tmpOrderDetail: OrderDetail | undefined




    async function createOrder(_data: CreateOrderData, actions: CreateOrderActions) {
        const cartStorage = getCartStorage();
        const cartItems = cartStorage.map(item => ({
            pid: item[0],
            quantity: item[1],
        })).filter(item => item.quantity > 0);
        if (cartItems.length === 0) {
            window.location.reload();
            return "Invalid cart items";
        }
        const orderDetail = await request({
            path: 'orders/get-order-details',
            method: 'POST',
            schema: orderDetailSchema,
            data: {
                cart: cartItems
            }
        }).catch((error) => {
            clearCart();
            throw error;
        });
        tmpOrderDetail = orderDetail;
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: orderDetail.purchase_units,
        });
    }


    async function onApprove(_data: OnApproveData, actions: OnApproveActions) {
        if (!actions.order) return Promise.resolve();
        return actions.order.capture().then((data) => request({
            path: 'orders/save-order',
            method: 'POST',
            schema: z.object({
                success: z.literal(true),
            }),
            data: {
                purchase_units: data.purchase_units,
            }
        })).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['my-orders']
            })
            clearCart();
            router.navigate({
                to: "/order-success"
            })
        })
    }

    async function onCancel() {
        if (tmpOrderDetail) {
            await request({
                path: 'orders/cancel-order',
                method: 'POST',
                schema: z.object({
                    success: z.literal(true),
                }),
                data: {
                    purchase_units: tmpOrderDetail.purchase_units,
                }
            });
        }
        router.navigate({
            to: "/order-canceled"
        })

    }

    async function onError() {
        router.navigate({
            to: "/order-error"
        })
    }

    const disabled = !isLogged || cart.length === 0 || isPending;

    return (
        <>
                {isPending && <Loader2 className="animate-spin  size-10 place-self-center" />}
                <PayPalButtons
                    style={{
                        layout: 'horizontal',
                        color: 'gold',
                        label: "checkout",
                        shape: 'rect',
                        tagline: false,
                        height: 40,
                    }}
                    disabled={disabled}
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}
                />
                <p className="text-red-500   col-span-2  text-end text-opacity-80">{errorMessage}</p>


        </>
    )
}

const CheckOutBtn: FC = () => {
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <Btn />
        </PayPalScriptProvider>
    )
}



export default CheckOutBtn;