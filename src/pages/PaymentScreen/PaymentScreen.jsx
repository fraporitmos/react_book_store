import Lottie from "lottie-react";
import React from "react";
import Confetti from "../../assets/confetti.json";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
    const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center flex-col ">
      <Lottie animationData={Confetti} className="w-full h-86 top-0 left-0" />
      <span className="text-lg text-gray-800 font-light text-center ">
        Tu compra ha sido exitosa, pronto llegará tu pedido.
      </span>

      <button 
      onClick={()=>{navigate("/libros")}}
      className="flex mt-6 cursor-pointer items-center px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
        <FaHome size={22} />
        <span className="ml-2">Ir a Home</span>
      </button>
    </div>
  );
};

export default PaymentScreen;
