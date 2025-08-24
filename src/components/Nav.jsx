import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {


  return (
    <div className="py-7 px-15 bg-[] text-white flex items-center justify-between">
      <h1 className="font-bacley text-7xl ">Frame</h1>
      <div className="flex gap-10 ">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/minimal">Minimal</Link>
        <Link to="/black">Black</Link>
      </div>
    </div>
  );
};

export default Nav;
