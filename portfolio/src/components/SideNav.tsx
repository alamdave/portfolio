import React, { useState } from "react";

import {
  GiHamburgerMenu,
  GiBlackBook,
  GiRotaryPhone,
  GiBubblingFlask,
  GiHouse,
  GiOfficeChair,
} from "react-icons/gi";

const SideNav: React.FC = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div>
      <GiHamburgerMenu
        onClick={handleNav}
        className="absolute top-4 right-4 z-[99] md:hidden"
      ></GiHamburgerMenu>
      {nav ? (
        <div className="fixed w-full h-screen bg-white/90 flex flex-col justify-center items-center z-20">
          <a
            href="#home"
            className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiHouse size={20} />
            <span className="pl-4">Home</span>
          </a>
          <a
            href="#work"
            className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiOfficeChair size={20} />
            <span className="pl-4">Work</span>
          </a>
          <a
            href="#projects"
            className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiBubblingFlask size={20} />
            <span className="pl-4">Projects</span>
          </a>
          <a
            href="#resume"
            className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiBlackBook size={20} />
            <span className="pl-4">Resume</span>
          </a>
          <a
            href="#contact"
            className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiRotaryPhone size={20} />
            <span className="pl-4">Contact</span>
          </a>
        </div>
      ) : (
        ""
      )}
      <div className="md:block hidden fixed top-[25%] z-10">
        <div className="flex flex-col">
          <a
            href="#home"
            className="rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiHouse size={20} />
          </a>
          <a
            href="#work"
            className="rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiOfficeChair size={20} />
          </a>
          <a
            href="#projects"
            className="rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiBubblingFlask size={20} />
          </a>
          <a
            href="#main"
            className="rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiBlackBook size={20} />
          </a>
          <a
            href="#contact"
            className="rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <GiRotaryPhone size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
