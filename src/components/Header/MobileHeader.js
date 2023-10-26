import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import MobileCategory from "./../Categories/MobileCategory/MobileCategory";
import { ContextProvider } from "./../../ContextAPI/ContextAPI";

const MobileHeader = () => {
  const [mobileCategorySidebar, setMobileCategorySidebar] = useState(false);
  const { user } = useContext(ContextProvider);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".mobileCategoryBtn") &&
        !e.target.closest(".mobileCategory")
      ) {
        setMobileCategorySidebar(false);
      }
    });
  }, []);
  return (
    <>
      <div className="fixed bottom-0 w-full z-50 lg:hidden">
        <div className="flex justify-around items-center py-2 bg-base-100 text-sm  shadow-lg text-neutral/90">
          <NavLink to="/" className="flex flex-col items-center">
            <AiFillHome className="text-xl" />
            <h1>Home</h1>
          </NavLink>

          <NavLink to="/cart" className="flex flex-col items-center">
            <FaShoppingCart className="text-xl" />
            <h1>Cart</h1>
          </NavLink>

          <NavLink
            to={user ? "/account" : "/login"}
            className="flex flex-col items-center"
          >
            <MdAccountCircle className="text-2xl" />
            <h1>Account</h1>
          </NavLink>

          <button
            onClick={() => setMobileCategorySidebar(!mobileCategorySidebar)}
            className="flex flex-col items-center text-neutral mobileCategoryBtn"
          >
            <AiOutlineMenu className="text-xl" />
            <h1>Category</h1>
          </button>
        </div>
      </div>

      <MobileCategory
        mobileCategorySidebar={mobileCategorySidebar}
        setMobileCategorySidebar={setMobileCategorySidebar}
      />
    </>
  );
};

export default MobileHeader;
