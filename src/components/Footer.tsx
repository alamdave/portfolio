import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-customWhite py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Footer Navigation Links */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mb-4 sm:mb-0 ">
            <a
              href="#"
              className="hover:underline text-customBlack focus:underline  hover:text-customWhite "
            >
              Home
            </a>
            <a
              href="#"
              className="text-customBlack hover:underline focus:underline  hover:text-customWhite"
            >
              About
            </a>
            <a
              href="#"
              className="text-customBlack hover:underline focus:underline  hover:text-customWhite"
            >
              Services
            </a>
            <a
              href="#"
              className="text-customBlack hover:underline focus:underline  hover:text-customWhite"
            >
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              {/* Replace with actual social media icons */}
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center pt-2">
          <h1 className="font-titlef text-[12vw] sm:text-[12vw] md:text-[12vw] lg:text-[11vw] leading-none truncate text-customBlack whitespace-nowrap tracking-tight sm:tracking-normal md:tracking-wide lg:tracking-wider">
            GET IN TOUCH
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
