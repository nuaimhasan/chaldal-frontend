import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiHeart, FiLogIn } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";

const MainHeader = () => {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".searchInput")) {
        setSearchDropdown(false);
      }
    });
  }, []);

  return (
    <div className="py-2 text-neutral border-b sticky top-0 z-40 bg-[#ffffffcc] lg:backdrop-blur-[30px] backdrop-saturate-[200%]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="/images/logo/logo.png" alt="" className="w-28" />
            </Link>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="relative flex">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                onClick={() => setSearchDropdown(true)}
                placeholder="search Product..."
                className="searchInput border w-full px-3 py-1.5 outline-none"
              />
              <div className="px-3 text-lg text-base-100 bg-primary flex justify-center items-center rounded-r">
                <BsSearch />
              </div>

              {searchDropdown && (
                <div className="searchDropdown absolute w-full bg-base-100 p-4 shadow-lg max-h-96 overflow-y-auto top-full">
                  <ul>
                    <li
                      onClick={() => setSearchDropdown(false)}
                      className="hover:bg-gray-100 p-1"
                    >
                      <Link
                        to={`/products/slug`}
                        className="flex gap-2 items-center"
                      >
                        <img src="" alt="" className="w-12" />
                        <h6>title</h6>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:flex gap-6 items-center">
            <Link
              to="/account/wishlist"
              className="flex gap-1 items-center text-neutral hover:text-primary duration-300"
            >
              <FiHeart className="text-[17px]" />
              <h1 className="font-medium">wishlist</h1>
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
              <h1 className="font-medium">৳00</h1>
            </Link>

            <Link
              to="/account/wishlist"
              className="flex gap-1.5 items-center text-neutral hover:text-primary duration-300"
            >
              <FiLogIn className="text-[17px]" />
              <h1 className="font-medium">Login</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
