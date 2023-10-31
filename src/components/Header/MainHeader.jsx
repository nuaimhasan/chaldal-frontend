import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiHeart, FiLogIn, FiMonitor } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiUser, BiLogOutCircle } from "react-icons/bi";
import MobileMenuSidebar from "./MobileMenuSidebar";
import SearchBox from "./SearchBox";
import { UseContext } from "../../ContextApi/ContextApi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

const MainHeader = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { loggedUser, logout } = UseContext();

  const [profileDropdown, setProfileDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".profileDropdownBtn")) {
        setProfileDropdown(false);
      }
    });
  }, []);

  return (
    <div className="py-2 text-neutral border-b sticky top-0 z-40 bg-[#ffffffcc] backdrop-blur-[10px]">
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Link to="/">
              <img
                src="/images/logo/logo.png"
                alt=""
                className="w-20 sm:w-28"
              />
            </Link>
          </div>

          <div className="hidden md:block w-1/2 lg:w-3/5">
            <SearchBox />
          </div>

          <div className="flex gap-4 lg:gap-6 items-center">
            <Link
              to="/account/wishlist"
              className="flex gap-1 items-center text-neutral hover:text-primary duration-300"
            >
              <FiHeart className="text-lg sm:text-[17px]" />
              <h1 className="font-medium hidden sm:block">wishlist</h1>
            </Link>

            <Link
              to="/cart"
              className="flex gap-3 items-center hover:text-primary duration-300"
            >
              <div className="relative">
                <RiShoppingCartLine className="text-xl" />
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold bg-primary text-base-100 rounded-full -top-2 -right-2">
                  <span className="mt-px">0</span>
                </div>
              </div>
              <h1 className="font-medium hidden sm:block">৳00</h1>
            </Link>

            {loggedUser?.success ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-1 profileDropdownBtn"
                >
                  {loggedUser?.data?.image === "" ? (
                    <FaUserCircle className="text-lg" />
                  ) : (
                    <img
                      src={loggedUser?.data?.image}
                      alt=""
                      className="w-6 h-6 rounded-full border border-base-100"
                    />
                  )}

                  <p className="pt-px">{loggedUser?.data?.firstName}</p>
                </button>

                {profileDropdown && (
                  <ul className="absolute w-48 text-[15px] bg-base-100 right-0 top-[130%] shadow-lg rounded z-50 overflow-hidden text-neutral">
                    {loggedUser?.data?.role === "admin" && (
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="duration-200 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-200 w-full"
                        >
                          <RxDashboard className="text-lg" />
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        to="/account/profile"
                        className="duration-200 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-200 w-full"
                      >
                        <FiMonitor className="text-lg" />
                        View Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/account/wishlist"
                        className="duration-200 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-200 w-full"
                      >
                        <AiOutlineHeart className="text-xl" />
                        My Wishlist
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/account/orders"
                        className="duration-200 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-200 w-full"
                      >
                        <IoBagCheckOutline className="text-xl" />
                        My Order List
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={logout}
                        className="duration-200 px-3 py-1.5 flex items-center gap-1 hover:bg-gray-200 w-full text-primary border-t"
                      >
                        <BiLogOutCircle className="text-base" />
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex gap-1.5 items-center text-neutral hover:text-primary duration-300"
              >
                <FiLogIn className="text-xl sm:text-[17px]" />
                <h1 className="font-medium hidden sm:block">Login</h1>
              </Link>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenu(true)}
                className="text-[22px] text-neutral mt-1.5"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenuSidebar
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
    </div>
  );
};

export default MainHeader;
