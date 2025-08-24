import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-[#00060a] text-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Logo */}
      <h1 className="font-bacley text-5xl mb-4 md:mb-0 md:text-6xl text-center md:text-left">
        Frame
      </h1>

      {/* Nav Links */}
      <div className="flex justify-center md:justify-end gap-6 md:gap-10 text-lg">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/cars" className="hover:text-gray-300">Cars</Link>
        <Link to="/minimal" className="hover:text-gray-300">Minimal</Link>
        <Link to="/black" className="hover:text-gray-300">Black</Link>
      </div>
    </nav>
  );
};

export default Nav;
