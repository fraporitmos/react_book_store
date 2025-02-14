import React, { useContext, useEffect, useRef } from "react";
import Empty from "../../assets/emptycart.json";
import Lottie from "lottie-react";
import { CartContext } from "../../context/CartContext";
import Purchase from "../../components/Purchase/Purchase";
import { IoLogoWhatsapp } from "react-icons/io";
import { PaypalWrapper } from "../../components/Paypal/PaypalWrapper";

const CartScreen = () => {
  const { cart, addBookCart } = useContext(CartContext);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) return;
    effectCalled.current = true;
  }, []);

  const buyWithWhatsApp = () => {
    const numberPhone = "51947254438";
    var message =
      "Hola EcommerceBooks 👋🏻.\nDeseo adquirir los siguientes productos:";
    cart.forEach((item) => {
      message += `\n================================\n📔 Producto: ${item.name}\n💰 Precio: ${item.price}\n🖼️ Imagen: ${item.img}\n================================`;
    });

    const url = `https://api.whatsapp.com/send?phone=${numberPhone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "blank");
  };

  return (
    <div className="pt-28">
      {cart.length > 0 ? (
        cart.map((item) => (
          <Purchase name={item.name} price={item.price} img={item.img} />
        ))
      ) : (
        <div className="flex h-screen items-center justify-center flex-col ">
          <Lottie animationData={Empty} className="w-86 h-86 top-0 left-0" />
          <span className="text-lg text-gray-800 font-light ">
            No hay libros en tu carrito.
          </span>
        </div>
      )}

      {cart.length && (
        <div className="flex w-full my-6  flex-col items-center">
          <button
            onClick={() => {
              buyWithWhatsApp();
            }}
            type="button"
            class="py-2 px-4 flex w-96 justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <IoLogoWhatsapp size={32} />
            <span className="ml-2">Pedir por WhatsApp</span>
          </button>

          <PaypalWrapper />
        </div>
      )}
    </div>
  );
};

export default CartScreen;
