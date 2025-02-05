import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import "./Sidebar.css";
import BooksScreen from "../../pages/BooksScreen/BooksScreen";
import ComicsScreen from "../../pages/ComicsScreen/ComicsScreen";
import MagazinesScreen from "../../pages/MagazinesScreen/MagazinesScreen";

const Sidebar = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="w-full bg-menu content z-10">
        <div className="px-12 py-6">
          <SlMenu color="white" size={40} onClick={() => setIsOpen(!open)} />
        </div>
        <Menu
          customBurgerIcon={false}
          isOpen={open}
          overlayClassName={"custom-overlay"}
        >
          <Link id="home" className="menu-item" to="/libros">
            Libros
          </Link>
          <Link id="about" className="menu-item" to="/comics">
            Commics
          </Link>
          <Link id="contact" className="menu-item" to="/revistas">
            Revistas
          </Link>
        </Menu>
      </div>
      <Routes>
        <Route path="/" element={<BooksScreen />} />
        <Route path="/libros" element={<BooksScreen />} />
        <Route path="/comics" element={<ComicsScreen />} />
        <Route path="/revistas" element={<MagazinesScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Sidebar;
