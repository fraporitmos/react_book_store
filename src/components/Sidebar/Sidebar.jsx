import React, { useContext, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import "./Sidebar.css";
import BooksScreen from "../../pages/BooksScreen/BooksScreen";
import ComicsScreen from "../../pages/ComicsScreen/ComicsScreen";
import MagazinesScreen from "../../pages/MagazinesScreen/MagazinesScreen";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import CartScreen from "../../pages/CartScreen/CartScreen";
import PaymentScreen from "../../pages/PaymentScreen/PaymentScreen";

const Sidebar = () => {
  const [open, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <BrowserRouter>
      <div className="w-full bg-menu content z-10">
        <div className="px-12 py-3 flex flex-row w-scrren items-center justify-between">
          <SlMenu
            color="white"
            size={32}
            onClick={() => {
              setIsOpen(!open);
            }}
          />
          <Link to="/carrito">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-white text-lg font-bold">{cart.length}</h1>
              <FaShoppingCart size={22} color="white" />
            </div>
          </Link>
        </div>
        <Menu
          customBurgerIcon={false}
          isOpen={open}
          overlayClassName={"custom-overlay"}
        >
          <Link className="menu-item" to="/libros">
            Libros
          </Link>
          <Link className="menu-item" to="/comics">
            Commics
          </Link>
          <Link className="menu-item" to="/revistas">
            Revistas
          </Link>
          <Link className="menu-item" to="/carrito">
            Carrito
          </Link>
        </Menu>
      </div>

      <Routes>
        <Route path="/" element={<BooksScreen />} />
        <Route path="/libros" element={<BooksScreen />} />
        <Route path="/comics" element={<ComicsScreen />} />
        <Route path="/revistas" element={<MagazinesScreen />} />
        <Route path="/carrito" element={<CartScreen />} />
        <Route path="/success-pay" element={<PaymentScreen />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Sidebar;
