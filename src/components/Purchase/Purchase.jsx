import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Purchase = ({ name, price, img }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const subtotal = price * quantity;
  return (
    <div className="max-w-md  mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex w-full justify-between items-center mb-6">
          <img className="w-16 h-16 object-contain" src={img} />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        </div>

        <p className="text-gray-600 mb-4">Precio: S/{price.toFixed(2)}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Cantidad:</span>
          <div className="flex items-center">
            <button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              className="h-8 w-8"
              aria-label="Decrease quantity"
            >
              <FaMinus className="h-4 w-4" />
            </button>
            <span className="mx-3 text-lg font-semibold">{quantity}</span>
            <button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              className="h-8 w-8"
              aria-label="Increase quantity"
            >
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              Subtotal:
            </span>
            <span className="text-xl font-bold text-primary">S/{subtotal}</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Purchase;
