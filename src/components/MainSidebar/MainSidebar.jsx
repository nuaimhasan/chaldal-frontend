import { Link } from "react-router-dom";
import MobileCategoriesSidebar from "../MobileCategoriesSidebar/MobileCategoriesSidebar";
import { IoIosHelpCircle } from "react-icons/io";
import { AiFillCustomerService } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { FcFlashOn } from "react-icons/fc";
import { FaSellsy } from "react-icons/fa6";

export default function MainSidebar() {
  return (
    <div className="p-2 text-sm w-full">
      <ul className="border-b pb-3 mb-3">
        <li className="hover:bg-[#f3f4f6] duration-300 rounded px-2 py-1.5">
          <Link to="/shops" className="flex items-center gap-2">
            <MdLocalOffer className="text-secondary text-lg" />
            Offers
          </Link>
        </li>
        <li className="hover:bg-[#f3f4f6] duration-300 rounded px-2 py-1.5">
          <Link to="/flash-sales" className="flex items-center gap-1.5">
            <FcFlashOn className="text-2xl" />
            Flash Sales
          </Link>
        </li>
        <li className="hover:bg-[#f3f4f6] duration-300 rounded px-2 py-1.5">
          <Link to="/shops" className="flex items-center gap-1.5">
            <FaSellsy className="text-xl text-primary" />
            Populer Products
          </Link>
        </li>
      </ul>

      <div className="border-b pb-3 mb-3">
        <MobileCategoriesSidebar />
      </div>

      <div className="absolute left-0 bottom-0 w-full shadow-lg bg-base-100 z-40 text-[15px]">
        <div className="grid grid-cols-2 text-center">
          <Link
            to=""
            className="border-r py-2 flex items-center justify-center gap-2 hover:bg-gray-100 duration-200"
          >
            <IoIosHelpCircle className="text-secondary text-xl" />
            Help
          </Link>
          <Link
            to=""
            className="flex items-center justify-center gap-2 hover:bg-gray-100 duration-200"
          >
            <AiFillCustomerService className="text-secondary text-xl" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
