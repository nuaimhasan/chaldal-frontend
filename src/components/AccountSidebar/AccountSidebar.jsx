import { NavLink } from "react-router-dom";
import { FiMonitor } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineSetting } from "react-icons/ai";

export default function AccountSidebar() {
  return (
    <div>
      <div>
        <img src="" alt="" className="w-28 h-28 border rounded-full mx-auto" />
        <h3 className="text-center text-lg font-medium text-neutral-content">
          Nasim Uddin
        </h3>
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        <li>
          <NavLink to="/account/profile">
            <span className="flex items-center gap-2 hover:text-primary duration-300">
              <FiMonitor className="text-lg" />
              View Profile
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/wishlist">
            <span className="flex items-center gap-2 hover:text-primary duration-300">
              <AiOutlineHeart className="text-xl" />
              My Wishlist
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/orders">
            <span className="flex items-center gap-2 hover:text-primary duration-300">
              <IoBagCheckOutline className="text-xl" />
              My Order List
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account/setting">
            <span className="flex items-center gap-2 hover:text-primary duration-300">
              <AiOutlineSetting className="text-xl" />
              Setting
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
