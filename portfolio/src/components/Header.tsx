import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed w-screen top-0 left-0 right-0 z-50 bg-customWhite py-4">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-4 flex justify-between items-center bg-customWhite">
        <a
          href="#"
          className="text-customBlack hover:underline focus:underline hover:text-customWhite font-bodyf"
        >
          HOME
        </a>
        <a
          href="#"
          className="text-customBlack hover:underline focus:underline hover:text-customWhite font-bodyf"
        >
          PORTFOLIO
        </a>
        <a
          href="#"
          className="text-customBlack hover:underline focus:underline hover:text-customWhite font-bodyf"
        >
          ABOUT
        </a>
      </div>
    </header>
  );
};

export default Header;
