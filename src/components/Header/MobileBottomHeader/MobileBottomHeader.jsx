import { Link, NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";

import { useSelector } from "react-redux";

export default function MobileBottomHeader() {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <section className="border-y border-secondary/30 fixed sm:hidden bottom-0 left-0 w-full z-50 bg-base-100 pt-2 pb-1">
      <div className="container">
        <div className="grid grid-cols-6 text-neutral-content">
          <NavLink
            to="/"
            className="flex flex-col justify-center items-center gap-1"
          >
            <FiHome className="text-[17px]" />
            <p className="text-xs">Home</p>
          </NavLink>

          <Link
            to={carts?.length > 0 ? "/checkout" : "/shops"}
            className="col-span-4 bg-secondary text-base-100 flex items-center justify-center"
          >
            <p className="text-sm">
              {carts?.length > 0 ? "Place Order" : "Start Shopping"}
            </p>
          </Link>

          <NavLink
            to="/cart"
            className="flex flex-col justify-center items-center gap-1"
          >
            <div className="relative">
              <RiShoppingCartLine className="text-lg" />
              <div className="absolute flex items-center justify-center w-3.5 h-3.5 font-bold bg-primary text-base-100 rounded-full -top-1.5 -right-2">
                <span className="mt-px text-xs">{carts?.length}</span>
              </div>
            </div>
            <p className="text-xs">Cart</p>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
