import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {useNavigate} from 'react-router-dom'

export const PaypalWrapper = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    const navigate = useNavigate()
    const style = {"layout":"horizontal" };

    function createOrder() {
        return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: [
                    {
                        sku: "1blwyeo8",
                        quantity: 2,
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                return order.id;
            });
    }

    function onApprove(data) {
        return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                navigate("/success-pay")
            });
    }
    
    return (
        <>
            { (isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
                className="w-64 h-14 mt-4"
            />
        </>
    );
}