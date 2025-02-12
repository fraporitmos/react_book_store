import React, { useContext } from "react";
import { IoIosCart } from "react-icons/io";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const Book = ({ name, description,author, editorial,price,img, book }) => {
  
  const {cart, addBookCart} = useContext(CartContext);

  const addToCart = () =>{
    const existBook = cart.some( item => item._id === book._id )
    if(existBook){
      Swal.fire({
        title : "El libro ya está en tu carrito ",
        text: `El libro "${name}" ya se encuentra en la lista de tu carrito.`,
        icon: 'error'
      })
    }else{
      addBookCart([...cart, book])
    }
  }

  return (
    <div className="mx-8 px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
      <div className="flex items-center justify-center">
        <img
          className="w-1/2"
          src={img}
        />
      </div>
        <h3 className="my-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
          {name}
        </h3>

      <div className="flex justify-between items-center">
        <p className="text-2xl text-white">S/ {price}</p>

        <span className="px-4 py-2  text-xs rounded-full text-white  bg-gray-700 border-1 border-white ">
          {author}
        </span>
      </div>
      <p className=" mt-2 line-clamp-3 text-ellipsis text-gray-500 text-md dark:text-gray-300">
        {description}
      </p>
      <span className="text-blue-400 py-4 font-bold text-sm">{editorial}</span>

      <button
        type="button"
        onClick={ ()=>{  addToCart()  }}
        className="py-2 px-4 mt-2 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        <IoIosCart size={26} />

        <span className="ml-4"> Agregar al carrito</span>
      </button>
    </div>
  );
};

export default Book;
