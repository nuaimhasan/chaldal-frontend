import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FiLogIn, FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../Redux/user/userSlice";
import { CgMenuLeft } from "react-icons/cg";

import SearchBox from "./SearchBox";

export default function Header({ setMainSidebar, mainSidebar }) {
  const { loggedUser } = useSelector((state) => state.user);
  const [searchBox, setSearchBox] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setSearchBox(true);
      } else {
        setSearchBox(false);
      }
    });
  }, []);

  const [profileDropdown, setProfileDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".profileDropdownBtn") &&
        !e.target.closest(".user_info")
      ) {
        setProfileDropdown(false);
      }
    });
  }, []);

  return (
    <header className="py-1 sticky top-0 z-40 bg-yellow-300 text-neutral">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-end gap-2">
            <button
              onClick={() => setMainSidebar(!mainSidebar)}
              className="main_sidebar_btn text-2xl px-2 py-1.5 rounded hover:bg-yellow-400 duration-200"
            >
              <CgMenuLeft />
            </button>

            <Link to="/">
              <img
                src="/images/logo/logo.png"
                alt=""
                className="w-28 sm:w-32"
              />
            </Link>
          </div>

          {searchBox && (
            <div className="w-[60%] hidden sm:block">
              <SearchBox />
            </div>
          )}

          <div className="flex gap-3 lg:gap-6 items-center">
            {loggedUser?.success ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="profileDropdownBtn"
                >
                  <img
                    src={
                      loggedUser?.data?.image === "" ||
                      loggedUser?.data?.image === null
                        ? "/images/demo_user.jpg"
                        : `${import.meta.env.VITE_BACKEND_URL}/user/${
                            loggedUser?.data?.image
                          }`
                    }
                    alt=""
                    className="w-7 h-7 rounded-full border border-base-100"
                  />
                </button>

                {profileDropdown && (
                  <ul className="absolute w-max min-w-[220px] text-[15px] bg-base-100 right-0 top-[130%] shadow-lg rounded z-50 overflow-hidden text-neutral">
                    <li className="user_info px-2 py-1 border-b">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            loggedUser?.data?.image === "" ||
                            loggedUser?.data?.image === null
                              ? "/images/demo_user.jpg"
                              : `${import.meta.env.VITE_BACKEND_URL}/user/${
                                  loggedUser?.data?.image
                                }`
                          }
                          alt=""
                          className="w-9 h-9 rounded-full border border-base-100"
                        />
                        <div>
                          <h1 className="text-[17px]">
                            {loggedUser?.data?.name}
                          </h1>
                          <p className="text-sm text-neutral-content">
                            {loggedUser?.data?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    {(loggedUser?.data?.role === "admin" ||
                      loggedUser?.data?.role === "superAdmin") && (
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
                        onClick={() => dispatch(userLogout())}
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
                className="bg-secondary px-3 py-1 rounded text-base-100 flex gap-1.5 items-center hover:bg-secondary/80 duration-300"
              >
                <FiLogIn className="text-xl sm:text-[17px]" />
                <h1 className="font-medium hidden sm:block">Login</h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
