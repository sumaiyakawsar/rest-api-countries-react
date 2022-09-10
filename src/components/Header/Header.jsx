import React from "react";
import Toggle from "./Toggle";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="fixed w-full top-0 h-16 bg-neutral-50   dark:bg-[#2b3945] shadow-md ">
      <div className="container flex justify-between items-center w-4/5 mx-auto my-0 py-4">
        {/* Main Brand */}
        <Link
          to="/"
          className="font-extrabold text-md text-[#111517] dark:text-white"
        >
          Where in the world?
        </Link>

        {/* Switch Theme */}
        <Toggle />
      </div>
    </div>
  );
};

export default Header;
