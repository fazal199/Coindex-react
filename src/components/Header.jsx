import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openicon = (
    <RxHamburgerMenu
      onClick={() => setIsOpen(true)}
      className="text-3xl hidden text-white cursor-pointer absolute top-5 right-3 mobile:block"
    />
  );

  const closeicon = (
    <FaWindowClose
      onClick={() => setIsOpen(false)}
      className="text-3xl hidden text-white cursor-pointer absolute top-5 right-3 mobile:block"
    />
  );

  return (
    <div>
      <header className="bg-primary py-3 px-4 shadow-black  mobile:relative">
        <nav className="max-w-7xl mx-auto flex flex-row flex-wrap justify-between mobile:flex-col">
          <div className="flex flex-row gap-3 items-center">
            <figure className="inline-block">
              <img
                className="h-12"
                src="images/Cryptocurrency_Logo.svg"
                alt=""
              />
            </figure>
            <span className="font-mono text-3xl font-semibold text-white">
              Coindex
            </span>
          </div>
          <ul
            className={`flex  flex-row flex-wrap gap-10 items-center uppercase text-lg font-semibold tracking-wide cursor-pointer text-white mt-1 mobile-lg:gap-5 mobile:flex-col mobile:mt-6 mobile:gap-6 mobile:bg-primary mobile:py-8 mobile:box-content mobile:transition-all mobile:duration-700 mobile:ease-in mobile:absolute mobile:z-40 mobile:top-11  mobile:w-screen mobile:left-0 ${
              !isOpen ? "mobile:left-[-35rem]" : ""
            }`}
          >
           <li>
              <NavLink to="/" className={ ({isActive}) => `hover:bg-white hover:text-blue-950 block px-2 py-1 rounded transition-all duration-500 ${isActive ? 'bg-white text-blue-950' : ''}`}>
                Home
              </NavLink>
           </li>
          <li>
              <NavLink to="/exchanges" className={ ({isActive}) => `hover:bg-white hover:text-blue-950 block px-2 py-1 rounded transition-all duration-500 ${isActive ? 'bg-white text-blue-950' : ''}`}>
                Exchanges
              </NavLink>
          </li>
          <li>
              <NavLink to="/coins" className={ ({isActive}) => `hover:bg-white hover:text-blue-950 block px-2 py-1 rounded transition-all duration-500 ${isActive ? 'bg-white text-blue-950' : ''}`}>
                Coins
              </NavLink>
          </li>
          </ul>
          {isOpen ? closeicon : openicon}
        </nav>
      </header>
    </div>
  );
};

export default Header;
