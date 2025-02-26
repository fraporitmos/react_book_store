import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import PocketBase from "pocketbase";

export const PaypalWrapper = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { cart, addBookCart } = useContext(CartContext);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const style = { layout: "horizontal" };
  var isPaySucces = false;

  useEffect(() => {
    const newOrder = cart.map((item) => ({
      ...item,
      sku: "1blwyeo8",
    }));
    setOrder(newOrder);
  }, []);

  const postOrderPocketbase = async (
    payer,
    email,
    address,
    paymentDate,
    currency_code,
    valuePayment
  ) => {
    if (!isPaySucces) {
      isPaySucces = true;
      const pb = new PocketBase("https://mcfrapo.pockethost.io");
      const data = {
        payer: payer,
        email: email,
        address: address,
        paymentDate: paymentDate,
        currency_code: currency_code,
        valuePayment: valuePayment,
        books: cart,
        state: "pending"
      };
      const record = await pb.collection("order").create(data);
    }
  };

  function createOrder() {
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: [...order],
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => {
        return order.id;
      });
  }

  function onApprove(data) {
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        const payer =
          jsonData.payer.name.given_name + " " + jsonData.payer.name.surname;
        const email = jsonData.payer.email_address;
        const address =
          jsonData.purchase_units[0].shipping.address.address_line_1 +
          ", " +
          jsonData.purchase_units[0].shipping.address.admin_area_2 +
          ", " +
          jsonData.purchase_units[0].shipping.address.admin_area_1 +
          ", " +
          jsonData.purchase_units[0].shipping.address.country_code;
        const paymentDate =
          jsonData.purchase_units[0].payments.captures[0].create_time;
        const currency_code =
          jsonData.purchase_units[0].payments.captures[0].amount.currency_code;
        const valuePayment =
          jsonData.purchase_units[0].payments.captures[0].amount.value;

        postOrderPocketbase(
          payer,
          email,
          address,
          paymentDate,
          currency_code,
          valuePayment
        );
        addBookCart([]);
        navigate("/success-pay");
      });
  }

  return (
    <>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
        className="w-96 h-14 mt-4"
      />
    </>
  );
};
