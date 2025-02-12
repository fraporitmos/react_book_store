import React, { useContext, useEffect, useRef } from "react";
import Empty from "../../assets/emptycart.json";
import Lottie from "lottie-react";
import { CartContext } from "../../context/CartContext";
import Purchase from "../../components/Purchase/Purchase";

const CartScreen = () => {
  const { cart, addBookCart } = useContext(CartContext);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) return;


    effectCalled.current = true;

  }, []);

  return (
    <div className="pt-32">
      {cart.length > 0 ? 
      (
        cart.map( item => (
            <Purchase 
                name = {item.name}
                price = {item.price}
                img = {item.img}
            />
        ))
      ) : (
        <div className="flex h-screen items-center justify-center flex-col ">
          <Lottie animationData={Empty} className="w-86 h-86 top-0 left-0" />
          <span className="text-lg text-gray-800 font-light ">
            No hay libros en tu carrito.
          </span>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
